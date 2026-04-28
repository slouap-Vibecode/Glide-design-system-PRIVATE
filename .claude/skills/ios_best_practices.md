# iOS Best Practices & Coding Standards
## Manga Spark Development Excellence Guide

### Table of Contents
1. [Code Style & Conventions](#code-style--conventions)
2. [SwiftUI Best Practices](#swiftui-best-practices)
3. [Architecture Patterns](#architecture-patterns)
4. [Core Data Excellence](#core-data-excellence)
5. [Performance Optimization](#performance-optimization)
6. [Testing Standards](#testing-standards)
7. [Security Guidelines](#security-guidelines)
8. [Accessibility Excellence](#accessibility-excellence)
9. [Code Organization](#code-organization)
10. [Quality Assurance](#quality-assurance)

---

## Code Style & Conventions

### Swift Naming Conventions
```swift
// ✅ CORRECT
class MangaListViewModel: ObservableObject {
    @Published var mangaCollection: [Manga] = []
    @Published var isLoading: Bool = false

    private let dataManager: DataManagerProtocol
    private let imageCache: ImageCacheProtocol

    func fetchPopularManga() async { }
    func markMangaAsRead(_ manga: Manga) { }
}

// ❌ INCORRECT
class mangalistvm: ObservableObject {
    @Published var data: [Manga] = []
    @Published var loading: Bool = false

    var dm: DataManager?
    var cache: ImageCache?

    func getPopular() async { }
    func mark(_ m: Manga) { }
}
```

### File Organization Standards
```swift
// MARK: - File Header
//
//  MangaListView.swift
//  Manga Spark
//
//  Created by [Developer] on [Date].
//  Copyright © 2024 Manga Spark. All rights reserved.
//

import SwiftUI
import Combine

// MARK: - Main View
struct MangaListView: View {
    // MARK: - Properties
    @StateObject private var viewModel = MangaListViewModel()
    @State private var searchText = ""

    // MARK: - Body
    var body: some View {
        // Implementation
    }
}

// MARK: - View Components
extension MangaListView {
    @ViewBuilder
    private var mangaGrid: some View {
        // Implementation
    }

    @ViewBuilder
    private var loadingView: some View {
        // Implementation
    }
}

// MARK: - Actions
extension MangaListView {
    private func handleMangaTap(_ manga: Manga) {
        // Implementation
    }
}

// MARK: - Preview
#Preview {
    MangaListView()
}
```

### Code Documentation Standards
```swift
/// Manages the manga library and provides data to the UI layer
///
/// This class handles all manga-related operations including:
/// - Fetching manga from local Core Data store
/// - Managing reading progress tracking
/// - Handling search and filtering operations
///
/// - Important: All UI updates are performed on the main actor
/// - Note: This class is thread-safe and can be accessed from background queues
@MainActor
final class MangaLibraryManager: ObservableObject {

    /// Fetches manga matching the specified search criteria
    /// - Parameters:
    ///   - query: The search term to match against manga titles and authors
    ///   - genre: Optional genre filter
    ///   - status: Optional reading status filter
    /// - Returns: Array of manga matching the criteria
    /// - Throws: `DataError` if the fetch operation fails
    func searchManga(
        query: String,
        genre: Genre? = nil,
        status: ReadingStatus? = nil
    ) async throws -> [Manga] {
        // Implementation
    }
}
```

---

## SwiftUI Best Practices

### View Composition & Performance
```swift
// ✅ CORRECT: Small, focused views
struct MangaCard: View {
    let manga: Manga

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            mangaCoverImage
            mangaInfo
        }
        .cardStyle()
    }
}

extension MangaCard {
    @ViewBuilder
    private var mangaCoverImage: some View {
        AsyncImage(url: manga.coverImageURL) { image in
            image
                .resizable()
                .aspectRatio(3/4, contentMode: .fit)
        } placeholder: {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color.gray.opacity(0.3))
                .aspectRatio(3/4, contentMode: .fit)
                .redacted(reason: .placeholder)
        }
    }

    @ViewBuilder
    private var mangaInfo: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(manga.title)
                .font(.headline)
                .lineLimit(2)

            Text(manga.author)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

// ❌ INCORRECT: Monolithic view
struct MangaCard: View {
    let manga: Manga

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            AsyncImage(url: manga.coverImageURL) { image in
                image.resizable().aspectRatio(3/4, contentMode: .fit)
            } placeholder: {
                RoundedRectangle(cornerRadius: 8).fill(Color.gray.opacity(0.3)).aspectRatio(3/4, contentMode: .fit).redacted(reason: .placeholder)
            }
            VStack(alignment: .leading, spacing: 4) {
                Text(manga.title).font(.headline).lineLimit(2)
                Text(manga.author).font(.caption).foregroundColor(.secondary)
            }
        }
        .cardStyle()
    }
}
```

### State Management Best Practices
```swift
// ✅ CORRECT: Proper state management
@MainActor
final class MangaDetailViewModel: ObservableObject {
    // MARK: - Published Properties
    @Published private(set) var manga: Manga
    @Published private(set) var readingProgress: ReadingProgress?
    @Published private(set) var isLoading = false
    @Published var showingChapterList = false

    // MARK: - Private Properties
    private let dataManager: DataManagerProtocol
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Initialization
    init(manga: Manga, dataManager: DataManagerProtocol = DataManager.shared) {
        self.manga = manga
        self.dataManager = dataManager
        setupBindings()
    }

    // MARK: - Public Methods
    func markChapterAsRead(_ chapterNumber: Int) async {
        isLoading = true
        defer { isLoading = false }

        do {
            try await dataManager.markChapterAsRead(
                mangaId: manga.id,
                chapterNumber: chapterNumber
            )
            await refreshReadingProgress()
        } catch {
            // Handle error appropriately
            handleError(error)
        }
    }

    // MARK: - Private Methods
    private func setupBindings() {
        dataManager.readingProgressPublisher(for: manga.id)
            .receive(on: DispatchQueue.main)
            .assign(to: &$readingProgress)
    }

    private func handleError(_ error: Error) {
        // Implement proper error handling
    }
}
```

### SwiftUI Performance Optimization
```swift
// ✅ CORRECT: Efficient list rendering
struct MangaListView: View {
    @StateObject private var viewModel = MangaListViewModel()

    var body: some View {
        NavigationStack {
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(viewModel.displayedManga) { manga in
                    NavigationLink(value: manga) {
                        MangaCard(manga: manga)
                            .onAppear {
                                viewModel.loadMoreIfNeeded(currentManga: manga)
                            }
                    }
                }
            }
            .navigationDestination(for: Manga.self) { manga in
                MangaDetailView(manga: manga)
            }
        }
        .task {
            await viewModel.loadInitialManga()
        }
        .refreshable {
            await viewModel.refresh()
        }
    }

    private var columns: [GridItem] {
        [GridItem(.adaptive(minimum: 120), spacing: 16)]
    }
}

// ❌ INCORRECT: Inefficient rendering
struct MangaListView: View {
    @StateObject private var viewModel = MangaListViewModel()

    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: [
                    GridItem(.adaptive(minimum: 120), spacing: 16)
                ], spacing: 16) {
                    ForEach(viewModel.allManga) { manga in // Loading all data at once
                        NavigationLink(destination: MangaDetailView(manga: manga)) {
                            VStack {
                                AsyncImage(url: manga.coverImageURL) { image in
                                    image.resizable().aspectRatio(3/4, contentMode: .fit)
                                } placeholder: {
                                    Color.gray
                                }
                                Text(manga.title)
                            }
                        }
                    }
                }
            }
        }
        .onAppear {
            viewModel.loadAllManga() // Blocking operation
        }
    }
}
```

---

## Architecture Patterns

### MVVM Implementation
```swift
// MARK: - Model
struct Manga: Identifiable, Codable {
    let id: UUID
    let title: String
    let author: String
    let coverImageURL: URL?
    let genre: [Genre]
    let status: PublicationStatus
    let totalChapters: Int?

    // MARK: - Computed Properties
    var isCompleted: Bool {
        status == .completed
    }
}

// MARK: - View Model
@MainActor
final class MangaLibraryViewModel: ObservableObject {
    // MARK: - Published Properties
    @Published var mangaLibrary: [Manga] = []
    @Published var filteredManga: [Manga] = []
    @Published var searchText = "" {
        didSet {
            filterManga()
        }
    }
    @Published var selectedGenre: Genre? {
        didSet {
            filterManga()
        }
    }
    @Published var loadingState: LoadingState = .idle

    // MARK: - Dependencies
    private let mangaService: MangaServiceProtocol
    private let cacheManager: CacheManagerProtocol
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Initialization
    init(
        mangaService: MangaServiceProtocol = MangaService(),
        cacheManager: CacheManagerProtocol = CacheManager.shared
    ) {
        self.mangaService = mangaService
        self.cacheManager = cacheManager
        setupBindings()
    }

    // MARK: - Public Methods
    func loadMangaLibrary() async {
        loadingState = .loading

        do {
            let manga = try await mangaService.fetchUserLibrary()
            mangaLibrary = manga
            filterManga()
            loadingState = .loaded
        } catch {
            loadingState = .error(error)
        }
    }

    // MARK: - Private Methods
    private func setupBindings() {
        // Setup reactive bindings
    }

    private func filterManga() {
        filteredManga = mangaLibrary.filter { manga in
            let matchesSearch = searchText.isEmpty ||
                               manga.title.localizedCaseInsensitiveContains(searchText) ||
                               manga.author.localizedCaseInsensitiveContains(searchText)

            let matchesGenre = selectedGenre == nil ||
                              manga.genre.contains(selectedGenre!)

            return matchesSearch && matchesGenre
        }
    }
}

// MARK: - View
struct MangaLibraryView: View {
    @StateObject private var viewModel = MangaLibraryViewModel()

    var body: some View {
        NavigationStack {
            VStack {
                searchAndFilterBar
                mangaGrid
            }
            .navigationTitle("My Library")
            .task {
                await viewModel.loadMangaLibrary()
            }
        }
    }

    @ViewBuilder
    private var searchAndFilterBar: some View {
        HStack {
            SearchBar(text: $viewModel.searchText)
            GenrePicker(selection: $viewModel.selectedGenre)
        }
        .padding(.horizontal)
    }

    @ViewBuilder
    private var mangaGrid: some View {
        switch viewModel.loadingState {
        case .idle:
            EmptyView()
        case .loading:
            ProgressView("Loading library...")
        case .loaded:
            MangaGrid(manga: viewModel.filteredManga)
        case .error(let error):
            ErrorView(error: error) {
                Task { await viewModel.loadMangaLibrary() }
            }
        }
    }
}
```

### Dependency Injection Pattern
```swift
// MARK: - Protocol Definitions
protocol MangaServiceProtocol {
    func fetchPopularManga() async throws -> [Manga]
    func searchManga(query: String) async throws -> [Manga]
    func fetchMangaDetail(id: UUID) async throws -> MangaDetail
}

protocol CacheManagerProtocol {
    func cachedImage(for url: URL) -> UIImage?
    func cacheImage(_ image: UIImage, for url: URL)
    func clearCache()
}

// MARK: - Dependency Container
final class DependencyContainer: ObservableObject {
    // MARK: - Shared Instance
    static let shared = DependencyContainer()

    // MARK: - Services
    lazy var mangaService: MangaServiceProtocol = MangaService(
        networkManager: networkManager,
        coreDataManager: coreDataManager
    )

    lazy var cacheManager: CacheManagerProtocol = CacheManager()

    lazy var networkManager: NetworkManagerProtocol = NetworkManager()

    lazy var coreDataManager: CoreDataManagerProtocol = CoreDataManager()

    // MARK: - Private Init
    private init() {}
}

// MARK: - View Model with Dependency Injection
@MainActor
final class MangaDiscoveryViewModel: ObservableObject {
    // MARK: - Dependencies (Injected)
    private let mangaService: MangaServiceProtocol
    private let cacheManager: CacheManagerProtocol

    // MARK: - Initialization
    init(
        mangaService: MangaServiceProtocol = DependencyContainer.shared.mangaService,
        cacheManager: CacheManagerProtocol = DependencyContainer.shared.cacheManager
    ) {
        self.mangaService = mangaService
        self.cacheManager = cacheManager
    }
}
```

---

## Core Data Excellence

### Entity Design Best Practices
```swift
// MARK: - Core Data Model
@objc(Manga)
public class Manga: NSManagedObject {
    // MARK: - Core Properties
    @NSManaged public var id: UUID
    @NSManaged public var title: String
    @NSManaged public var author: String
    @NSManaged public var coverImageURL: String?
    @NSManaged public var createdAt: Date
    @NSManaged public var updatedAt: Date

    // MARK: - Reading Properties
    @NSManaged public var readingStatus: String
    @NSManaged public var currentChapter: Int32
    @NSManaged public var lastReadDate: Date?
    @NSManaged public var isFavorite: Bool

    // MARK: - Metadata
    @NSManaged public var genre: String? // JSON string
    @NSManaged public var totalChapters: Int32
    @NSManaged public var publicationYear: Int32
    @NSManaged public var isCompleted: Bool

    // MARK: - Relationships
    @NSManaged public var chapters: NSSet?
    @NSManaged public var readingProgress: ReadingProgress?

    // MARK: - Computed Properties
    var genreList: [Genre] {
        get {
            guard let genre = genre,
                  let data = genre.data(using: .utf8) else { return [] }
            return (try? JSONDecoder().decode([Genre].self, from: data)) ?? []
        }
        set {
            let data = try? JSONEncoder().encode(newValue)
            genre = data.flatMap { String(data: $0, encoding: .utf8) }
        }
    }

    var readingStatusEnum: ReadingStatus {
        get { ReadingStatus(rawValue: readingStatus) ?? .planToRead }
        set { readingStatus = newValue.rawValue }
    }
}

// MARK: - Generated Accessors for Chapters
extension Manga {
    @objc(addChaptersObject:)
    @NSManaged public func addToChapters(_ value: Chapter)

    @objc(removeChaptersObject:)
    @NSManaged public func removeFromChapters(_ value: Chapter)

    @objc(addChapters:)
    @NSManaged public func addToChapters(_ values: NSSet)

    @objc(removeChapters:)
    @NSManaged public func removeFromChapters(_ values: NSSet)
}

// MARK: - Fetch Request
extension Manga {
    @nonobjc public class func fetchRequest() -> NSFetchRequest<Manga> {
        return NSFetchRequest<Manga>(entityName: "Manga")
    }

    static func fetchByStatus(_ status: ReadingStatus) -> NSFetchRequest<Manga> {
        let request = fetchRequest()
        request.predicate = NSPredicate(format: "readingStatus == %@", status.rawValue)
        request.sortDescriptors = [
            NSSortDescriptor(keyPath: \Manga.updatedAt, ascending: false)
        ]
        return request
    }

    static func search(query: String) -> NSFetchRequest<Manga> {
        let request = fetchRequest()
        request.predicate = NSPredicate(
            format: "title CONTAINS[cd] %@ OR author CONTAINS[cd] %@",
            query, query
        )
        request.sortDescriptors = [
            NSSortDescriptor(keyPath: \Manga.title, ascending: true)
        ]
        return request
    }
}
```

### Core Data Manager Implementation
```swift
// MARK: - Core Data Manager
final class CoreDataManager: ObservableObject {
    // MARK: - Shared Instance
    static let shared = CoreDataManager()

    // MARK: - Persistent Container
    lazy var persistentContainer: NSPersistentContainer = {
        let container = NSPersistentContainer(name: "MangaSpark")

        // Configure for CloudKit if needed
        guard let description = container.persistentStoreDescriptions.first else {
            fatalError("Failed to retrieve a persistent store description.")
        }

        description.setOption(true as NSNumber,
                            forKey: NSPersistentHistoryTrackingKey)
        description.setOption(true as NSNumber,
                            forKey: NSPersistentStoreRemoteChangeNotificationPostOptionKey)

        container.loadPersistentStores { _, error in
            if let error = error as NSError? {
                // Handle error appropriately
                fatalError("Core Data failed to load: \(error.localizedDescription)")
            }
        }

        container.viewContext.automaticallyMergesChangesFromParent = true
        return container
    }()

    // MARK: - Contexts
    var viewContext: NSManagedObjectContext {
        persistentContainer.viewContext
    }

    var backgroundContext: NSManagedObjectContext {
        persistentContainer.newBackgroundContext()
    }

    // MARK: - Private Init
    private init() {}

    // MARK: - Save Context
    func save() {
        let context = viewContext

        guard context.hasChanges else { return }

        do {
            try context.save()
        } catch {
            // Handle save error
            print("Failed to save Core Data context: \(error)")
        }
    }

    func saveBackground(_ block: @escaping (NSManagedObjectContext) -> Void) {
        let context = backgroundContext
        context.perform {
            block(context)

            guard context.hasChanges else { return }

            do {
                try context.save()
            } catch {
                print("Failed to save background context: \(error)")
            }
        }
    }
}

// MARK: - Async/Await Support
extension CoreDataManager {
    func performBackground<T>(_ block: @escaping (NSManagedObjectContext) throws -> T) async throws -> T {
        let context = backgroundContext

        return try await withCheckedThrowingContinuation { continuation in
            context.perform {
                do {
                    let result = try block(context)
                    continuation.resume(returning: result)
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }
}
```

### Performance-Optimized Fetch Operations
```swift
// MARK: - Manga Data Service
@MainActor
final class MangaDataService: ObservableObject {
    // MARK: - Properties
    private let coreDataManager: CoreDataManager
    private let batchSize = 20

    // MARK: - Initialization
    init(coreDataManager: CoreDataManager = CoreDataManager.shared) {
        self.coreDataManager = coreDataManager
    }

    // MARK: - Fetch Operations
    func fetchMangaLibrary() async throws -> [Manga] {
        try await coreDataManager.performBackground { context in
            let request: NSFetchRequest<Manga> = Manga.fetchRequest()
            request.fetchBatchSize = self.batchSize
            request.sortDescriptors = [
                NSSortDescriptor(keyPath: \Manga.updatedAt, ascending: false)
            ]

            // Optimize with faulting
            request.returnsObjectsAsFaults = false
            request.relationshipKeyPathsForPrefetching = ["chapters", "readingProgress"]

            return try context.fetch(request)
        }
    }

    func searchManga(query: String) async throws -> [Manga] {
        try await coreDataManager.performBackground { context in
            let request = Manga.search(query: query)
            request.fetchLimit = 100 // Limit search results
            request.fetchBatchSize = self.batchSize

            return try context.fetch(request)
        }
    }

    func addMangaToLibrary(_ mangaData: MangaDTO) async throws -> Manga {
        try await coreDataManager.performBackground { context in
            let manga = Manga(context: context)
            manga.id = UUID()
            manga.title = mangaData.title
            manga.author = mangaData.author
            manga.coverImageURL = mangaData.coverImageURL
            manga.createdAt = Date()
            manga.updatedAt = Date()
            manga.readingStatusEnum = .planToRead
            manga.genreList = mangaData.genres

            try context.save()
            return manga
        }
    }

    func updateReadingProgress(mangaId: UUID, chapter: Int) async throws {
        try await coreDataManager.performBackground { context in
            let request: NSFetchRequest<Manga> = Manga.fetchRequest()
            request.predicate = NSPredicate(format: "id == %@", mangaId as CVarArg)

            guard let manga = try context.fetch(request).first else {
                throw DataError.mangaNotFound
            }

            manga.currentChapter = Int32(chapter)
            manga.lastReadDate = Date()
            manga.updatedAt = Date()

            try context.save()
        }
    }
}

// MARK: - Data Transfer Objects
struct MangaDTO: Codable {
    let title: String
    let author: String
    let coverImageURL: String?
    let genres: [Genre]
    let totalChapters: Int?
    let publicationYear: Int?
}

// MARK: - Custom Errors
enum DataError: LocalizedError {
    case mangaNotFound
    case invalidData
    case saveFailed(Error)

    var errorDescription: String? {
        switch self {
        case .mangaNotFound:
            return "The requested manga could not be found."
        case .invalidData:
            return "The manga data is invalid."
        case .saveFailed(let error):
            return "Failed to save: \(error.localizedDescription)"
        }
    }
}
```

---

## Performance Optimization

### Memory Management
```swift
// ✅ CORRECT: Proper memory management
final class ImageCacheManager {
    private let cache = NSCache<NSString, UIImage>()
    private let memoryWarningObserver: NSObjectProtocol

    init() {
        // Configure cache limits
        cache.countLimit = 100
        cache.totalCostLimit = 50 * 1024 * 1024 // 50MB

        // Handle memory warnings
        memoryWarningObserver = NotificationCenter.default.addObserver(
            forName: UIApplication.didReceiveMemoryWarningNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            self?.cache.removeAllObjects()
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(memoryWarningObserver)
    }

    func image(for url: URL) -> UIImage? {
        cache.object(forKey: url.absoluteString as NSString)
    }

    func setImage(_ image: UIImage, for url: URL) {
        let cost = image.jpegData(compressionQuality: 1.0)?.count ?? 0
        cache.setObject(image, forKey: url.absoluteString as NSString, cost: cost)
    }
}

// ❌ INCORRECT: Memory leaks and retain cycles
final class BadImageManager {
    private var images: [String: UIImage] = [:] // Never cleared
    private var observers: [Any] = [] // Never removed

    func loadImage(from url: URL, completion: @escaping (UIImage?) -> Void) {
        URLSession.shared.dataTask(with: url) { data, _, _ in
            guard let data = data, let image = UIImage(data: data) else {
                completion(nil)
                return
            }

            self.images[url.absoluteString] = image // Memory leak
            completion(image)
        }.resume()
    }
}
```

### Efficient List Rendering
```swift
// ✅ CORRECT: Optimized list performance
struct MangaListView: View {
    @StateObject private var viewModel = MangaListViewModel()

    var body: some View {
        NavigationStack {
            List {
                LazyVStack(spacing: 0) {
                    ForEach(viewModel.displayedManga) { manga in
                        MangaRowView(manga: manga)
                            .onAppear {
                                viewModel.loadMoreIfNeeded(currentManga: manga)
                            }
                            .listRowSeparator(.hidden)
                            .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
                    }
                }
            }
            .listStyle(.plain)
            .refreshable {
                await viewModel.refresh()
            }
        }
        .task {
            await viewModel.loadInitialData()
        }
    }
}

struct MangaRowView: View {
    let manga: Manga

    var body: some View {
        HStack(spacing: 12) {
            mangaCoverImage
            mangaInfo
            Spacer()
            readingStatusBadge
        }
    }

    @ViewBuilder
    private var mangaCoverImage: some View {
        CachedAsyncImage(url: manga.coverImageURL) { image in
            image
                .resizable()
                .aspectRatio(2/3, contentMode: .fill)
        } placeholder: {
            RoundedRectangle(cornerRadius: 6)
                .fill(Color.gray.opacity(0.3))
                .aspectRatio(2/3, contentMode: .fill)
        }
        .frame(width: 50, height: 75)
        .clipShape(RoundedRectangle(cornerRadius: 6))
    }

    @ViewBuilder
    private var mangaInfo: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(manga.title)
                .font(.headline)
                .lineLimit(2)

            Text(manga.author)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .lineLimit(1)

            if let lastRead = manga.lastReadDate {
                Text("Last read: \(lastRead, style: .relative)")
                    .font(.caption)
                    .foregroundColor(.tertiary)
            }
        }
    }

    @ViewBuilder
    private var readingStatusBadge: some View {
        ReadingStatusBadge(status: manga.readingStatusEnum)
    }
}
```

### Background Processing
```swift
// ✅ CORRECT: Efficient background processing
actor DataSyncManager {
    static let shared = DataSyncManager()

    private var syncTask: Task<Void, Never>?

    private init() {}

    func startPeriodicSync() {
        syncTask?.cancel()

        syncTask = Task {
            while !Task.isCancelled {
                await performSync()

                // Wait 5 minutes before next sync
                try? await Task.sleep(for: .seconds(300))
            }
        }
    }

    func stopSync() {
        syncTask?.cancel()
        syncTask = nil
    }

    private func performSync() async {
        do {
            let localManga = await CoreDataManager.shared.fetchAllManga()
            let updates = await checkForUpdates(localManga)

            if !updates.isEmpty {
                await updateLocalData(with: updates)
            }
        } catch {
            print("Sync failed: \(error)")
        }
    }

    private func checkForUpdates(_ manga: [Manga]) async -> [MangaUpdate] {
        // Implement update checking logic
        []
    }

    private func updateLocalData(with updates: [MangaUpdate]) async {
        await CoreDataManager.shared.performBackground { context in
            for update in updates {
                // Apply updates to Core Data
            }
        }
    }
}
```

---

## Testing Standards

### Unit Testing Excellence
```swift
// MARK: - Unit Test Example
@testable import MangaSpark
import XCTest
import Combine

final class MangaLibraryViewModelTests: XCTestCase {
    // MARK: - Properties
    private var sut: MangaLibraryViewModel!
    private var mockMangaService: MockMangaService!
    private var mockCacheManager: MockCacheManager!
    private var cancellables: Set<AnyCancellable>!

    // MARK: - Setup & Teardown
    override func setUp() {
        super.setUp()
        mockMangaService = MockMangaService()
        mockCacheManager = MockCacheManager()
        sut = MangaLibraryViewModel(
            mangaService: mockMangaService,
            cacheManager: mockCacheManager
        )
        cancellables = Set<AnyCancellable>()
    }

    override func tearDown() {
        cancellables = nil
        sut = nil
        mockCacheManager = nil
        mockMangaService = nil
        super.tearDown()
    }

    // MARK: - Test Cases
    func testLoadMangaLibrary_Success() async {
        // Given
        let expectedManga = [
            MockData.createManga(title: "Naruto"),
            MockData.createManga(title: "One Piece")
        ]
        mockMangaService.fetchUserLibraryResult = .success(expectedManga)

        // When
        await sut.loadMangaLibrary()

        // Then
        XCTAssertEqual(sut.mangaLibrary.count, 2)
        XCTAssertEqual(sut.mangaLibrary.first?.title, "Naruto")
        XCTAssertEqual(sut.loadingState, .loaded)
    }

    func testLoadMangaLibrary_Failure() async {
        // Given
        let expectedError = NetworkError.noConnection
        mockMangaService.fetchUserLibraryResult = .failure(expectedError)

        // When
        await sut.loadMangaLibrary()

        // Then
        XCTAssertTrue(sut.mangaLibrary.isEmpty)
        XCTAssertEqual(sut.loadingState, .error(expectedError))
    }

    func testSearchFilter_UpdatesFilteredManga() {
        // Given
        sut.mangaLibrary = [
            MockData.createManga(title: "Naruto"),
            MockData.createManga(title: "One Piece"),
            MockData.createManga(title: "Dragon Ball")
        ]

        // When
        sut.searchText = "Nar"

        // Then
        XCTAssertEqual(sut.filteredManga.count, 1)
        XCTAssertEqual(sut.filteredManga.first?.title, "Naruto")
    }

    func testGenreFilter_UpdatesFilteredManga() {
        // Given
        let shonen = Genre.shonen
        sut.mangaLibrary = [
            MockData.createManga(title: "Naruto", genres: [shonen]),
            MockData.createManga(title: "Romance Novel", genres: [.romance]),
            MockData.createManga(title: "One Piece", genres: [shonen])
        ]

        // When
        sut.selectedGenre = shonen

        // Then
        XCTAssertEqual(sut.filteredManga.count, 2)
        XCTAssertTrue(sut.filteredManga.allSatisfy { $0.genreList.contains(shonen) })
    }
}

// MARK: - Mock Objects
final class MockMangaService: MangaServiceProtocol {
    var fetchUserLibraryResult: Result<[Manga], Error> = .success([])
    var searchMangaResult: Result<[Manga], Error> = .success([])

    func fetchUserLibrary() async throws -> [Manga] {
        switch fetchUserLibraryResult {
        case .success(let manga):
            return manga
        case .failure(let error):
            throw error
        }
    }

    func searchManga(query: String) async throws -> [Manga] {
        switch searchMangaResult {
        case .success(let manga):
            return manga.filter { $0.title.contains(query) }
        case .failure(let error):
            throw error
        }
    }

    func fetchMangaDetail(id: UUID) async throws -> MangaDetail {
        throw NetworkError.notImplemented
    }
}

// MARK: - Test Data Factory
enum MockData {
    static func createManga(
        title: String = "Test Manga",
        author: String = "Test Author",
        genres: [Genre] = [.action]
    ) -> Manga {
        Manga(
            id: UUID(),
            title: title,
            author: author,
            coverImageURL: nil,
            genre: genres,
            status: .ongoing,
            totalChapters: nil
        )
    }
}
```

### UI Testing Framework
```swift
// MARK: - UI Test Example
import XCTest

final class MangaSparkUITests: XCTestCase {
    private var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("--uitesting")
        app.launch()
    }

    func testMangaLibraryNavigation() {
        // Given - App is launched
        XCTAssertTrue(app.tabBars.buttons["Library"].exists)

        // When - User taps Library tab
        app.tabBars.buttons["Library"].tap()

        // Then - Library view is displayed
        XCTAssertTrue(app.navigationBars["My Library"].exists)
        XCTAssertTrue(app.searchFields["Search manga..."].exists)
    }

    func testMangaSearch() throws {
        // Given - User is on Library screen
        app.tabBars.buttons["Library"].tap()

        // When - User searches for manga
        let searchField = app.searchFields["Search manga..."]
        XCTAssertTrue(searchField.waitForExistence(timeout: 2))
        searchField.tap()
        searchField.typeText("Naruto")

        // Then - Search results are displayed
        let searchResults = app.collectionViews["MangaGrid"]
        XCTAssertTrue(searchResults.waitForExistence(timeout: 3))

        // Verify search results contain the query
        let firstResult = searchResults.cells.firstMatch
        XCTAssertTrue(firstResult.exists)
    }

    func testMangaDetailNavigation() throws {
        // Given - User is on Library screen with manga
        app.tabBars.buttons["Library"].tap()

        let mangaGrid = app.collectionViews["MangaGrid"]
        XCTAssertTrue(mangaGrid.waitForExistence(timeout: 3))

        // When - User taps on a manga
        let firstManga = mangaGrid.cells.firstMatch
        XCTAssertTrue(firstManga.exists)
        firstManga.tap()

        // Then - Manga detail view is presented
        XCTAssertTrue(app.navigationBars.element.exists)
        XCTAssertTrue(app.buttons["Mark as Read"].exists)
        XCTAssertTrue(app.buttons["Add to Favorites"].exists)
    }

    func testReadingStatusUpdate() throws {
        // Given - User is on manga detail screen
        navigateToFirstMangaDetail()

        // When - User updates reading status
        app.buttons["Mark as Read"].tap()

        // Then - Status is updated and reflected in UI
        XCTAssertTrue(app.buttons["Mark as Unread"].exists)

        // Navigate back and verify change persists
        app.navigationBars.buttons.element(boundBy: 0).tap()
        navigateToFirstMangaDetail()
        XCTAssertTrue(app.buttons["Mark as Unread"].exists)
    }

    // MARK: - Helper Methods
    private func navigateToFirstMangaDetail() {
        app.tabBars.buttons["Library"].tap()
        let mangaGrid = app.collectionViews["MangaGrid"]
        XCTAssertTrue(mangaGrid.waitForExistence(timeout: 3))
        mangaGrid.cells.firstMatch.tap()
    }
}

// MARK: - Performance Testing
final class MangaSparkPerformanceTests: XCTestCase {
    func testMangaLibraryLoadingPerformance() {
        measure {
            let app = XCUIApplication()
            app.launch()
            app.tabBars.buttons["Library"].tap()

            let mangaGrid = app.collectionViews["MangaGrid"]
            _ = mangaGrid.waitForExistence(timeout: 5)
        }
    }

    func testScrollingPerformance() {
        let app = XCUIApplication()
        app.launch()
        app.tabBars.buttons["Library"].tap()

        let mangaGrid = app.collectionViews["MangaGrid"]
        XCTAssertTrue(mangaGrid.waitForExistence(timeout: 3))

        measureMetrics([.wallClockTime]) {
            // Simulate scrolling through the list
            for _ in 0..<10 {
                mangaGrid.swipeUp()
            }
        }
    }
}
```

---

## Security Guidelines

### Data Protection
```swift
// ✅ CORRECT: Secure data handling
import CryptoKit

final class SecureStorageManager {
    private let keychain = Keychain(service: "com.mangaspark.app")

    // MARK: - Secure Storage
    func store<T: Codable>(_ item: T, forKey key: String) throws {
        let data = try JSONEncoder().encode(item)
        try keychain
            .accessibility(.afterFirstUnlockThisDeviceOnly)
            .set(data, key: key)
    }

    func retrieve<T: Codable>(_ type: T.Type, forKey key: String) throws -> T? {
        guard let data = try keychain.getData(key) else { return nil }
        return try JSONDecoder().decode(type, from: data)
    }

    // MARK: - Biometric Authentication
    func authenticateUser() async -> Bool {
        let context = LAContext()
        var error: NSError?

        guard context.canEvaluatePolicy(.biometryAny, error: &error) else {
            return false
        }

        do {
            let result = try await context.evaluatePolicy(
                .biometryAny,
                localizedReason: "Access your manga library"
            )
            return result
        } catch {
            return false
        }
    }
}

// ✅ CORRECT: Input validation
struct MangaInputValidator {
    static func validateTitle(_ title: String) -> ValidationResult {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)

        guard !trimmed.isEmpty else {
            return .invalid("Title cannot be empty")
        }

        guard trimmed.count <= 200 else {
            return .invalid("Title cannot exceed 200 characters")
        }

        // Check for potentially malicious content
        guard !containsHTMLTags(trimmed) else {
            return .invalid("Title contains invalid characters")
        }

        return .valid
    }

    static func validateURL(_ urlString: String?) -> ValidationResult {
        guard let urlString = urlString else { return .valid }

        guard let url = URL(string: urlString),
              url.scheme == "https" else {
            return .invalid("Only HTTPS URLs are allowed")
        }

        return .valid
    }

    private static func containsHTMLTags(_ string: String) -> Bool {
        let htmlPattern = "<[^>]*>"
        let regex = try? NSRegularExpression(pattern: htmlPattern)
        let range = NSRange(location: 0, length: string.utf16.count)
        return regex?.firstMatch(in: string, options: [], range: range) != nil
    }
}

enum ValidationResult {
    case valid
    case invalid(String)
}

// ❌ INCORRECT: Insecure practices
class BadDataManager {
    func storeUserData(_ data: [String: Any]) {
        // Storing sensitive data in UserDefaults (insecure)
        UserDefaults.standard.set(data, forKey: "userData")
    }

    func processUserInput(_ input: String) -> String {
        // No validation - vulnerable to injection
        return "Hello \(input)"
    }
}
```

### Network Security
```swift
// ✅ CORRECT: Secure networking
import Network

final class SecureNetworkManager {
    private let session: URLSession

    init() {
        let configuration = URLSessionConfiguration.default
        configuration.urlCache = nil
        configuration.requestCachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        configuration.tlsMinimumSupportedProtocolVersion = .TLSv12
        configuration.tlsMaximumSupportedProtocolVersion = .TLSv13

        // Certificate pinning
        session = URLSession(
            configuration: configuration,
            delegate: CertificatePinningDelegate(),
            delegateQueue: nil
        )
    }

    func fetchManga(from url: URL) async throws -> MangaResponse {
        guard url.scheme == "https" else {
            throw NetworkError.insecureURL
        }

        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("MangaSpark/1.0", forHTTPHeaderField: "User-Agent")

        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              200...299 ~= httpResponse.statusCode else {
            throw NetworkError.invalidResponse
        }

        return try JSONDecoder().decode(MangaResponse.self, from: data)
    }
}

// MARK: - Certificate Pinning
final class CertificatePinningDelegate: NSObject, URLSessionDelegate {
    func urlSession(
        _ session: URLSession,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        // Implement certificate pinning logic
        guard let serverTrust = challenge.protectionSpace.serverTrust else {
            completionHandler(.cancelAuthenticationChallenge, nil)
            return
        }

        // Verify certificate against pinned certificates
        if isValidCertificate(serverTrust) {
            completionHandler(.useCredential, URLCredential(trust: serverTrust))
        } else {
            completionHandler(.cancelAuthenticationChallenge, nil)
        }
    }

    private func isValidCertificate(_ serverTrust: SecTrust) -> Bool {
        // Implement certificate validation
        return true // Simplified for example
    }
}
```

---

## Accessibility Excellence

### VoiceOver Support
```swift
// ✅ CORRECT: Comprehensive accessibility
struct MangaCardView: View {
    let manga: Manga

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            mangaCoverImage
            mangaInfo
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityValue(accessibilityValue)
        .accessibilityHint("Double tap to view manga details")
        .accessibilityAction(named: "Add to favorites") {
            toggleFavorite()
        }
        .accessibilityAction(named: "Mark as read") {
            markAsRead()
        }
    }

    private var accessibilityLabel: String {
        "\(manga.title) by \(manga.author)"
    }

    private var accessibilityValue: String {
        let status = manga.readingStatusEnum.displayName
        let progress = manga.currentChapter > 0 ?
            "Chapter \(manga.currentChapter)" : "Not started"
        let favorite = manga.isFavorite ? "Favorite" : ""

        return [status, progress, favorite]
            .filter { !$0.isEmpty }
            .joined(separator: ", ")
    }

    @ViewBuilder
    private var mangaCoverImage: some View {
        AsyncImage(url: manga.coverImageURL) { image in
            image
                .resizable()
                .aspectRatio(3/4, contentMode: .fit)
        } placeholder: {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color.gray.opacity(0.3))
                .aspectRatio(3/4, contentMode: .fit)
        }
        .accessibilityLabel("Cover image for \(manga.title)")
        .accessibilityHidden(true) // Combined with parent accessibility
    }

    @ViewBuilder
    private var mangaInfo: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(manga.title)
                .font(.headline)
                .lineLimit(2)
                .minimumScaleFactor(0.8) // Support Dynamic Type

            Text(manga.author)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .accessibilityHidden(true) // Combined with parent accessibility
    }

    // MARK: - Actions
    private func toggleFavorite() {
        // Implementation
    }

    private func markAsRead() {
        // Implementation
    }
}

// ✅ CORRECT: Dynamic Type support
extension Font {
    static func mangaTitle() -> Font {
        .custom("Manga-Title", size: 18, relativeTo: .headline)
    }

    static func mangaCaption() -> Font {
        .custom("Manga-Caption", size: 12, relativeTo: .caption)
    }
}

struct DynamicTypeSupportedView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Manga Title")
                .font(.mangaTitle())
                .lineLimit(nil) // Allow unlimited lines for accessibility
                .minimumScaleFactor(0.5)

            Text("Author Name")
                .font(.mangaCaption())
                .lineLimit(nil)
        }
        .dynamicTypeSize(.xSmall ... .accessibility5) // Support full range
    }
}
```

### Color and Contrast
```swift
// ✅ CORRECT: Accessible color system
extension Color {
    // MARK: - Semantic Colors
    static let mangaPrimary = Color("MangaPrimary")
    static let mangaSecondary = Color("MangaSecondary")
    static let mangaBackground = Color("MangaBackground")
    static let mangaReadProgress = Color("MangaReadProgress")
    static let mangaUnreadProgress = Color("MangaUnreadProgress")

    // MARK: - High Contrast Support
    static func adaptiveColor(
        light: Color,
        dark: Color,
        highContrastLight: Color? = nil,
        highContrastDark: Color? = nil
    ) -> Color {
        Color("AdaptiveColor", bundle: .main)
    }

    // MARK: - Accessibility Colors
    static let accessibleGreen = Color("AccessibleGreen") // WCAG AA compliant
    static let accessibleRed = Color("AccessibleRed")
    static let accessibleBlue = Color("AccessibleBlue")
}

struct AccessibleProgressView: View {
    let progress: Double

    var body: some View {
        ZStack(alignment: .leading) {
            // Background
            RoundedRectangle(cornerRadius: 4)
                .fill(Color.mangaUnreadProgress)
                .frame(height: 8)

            // Progress
            RoundedRectangle(cornerRadius: 4)
                .fill(Color.mangaReadProgress)
                .frame(width: progressWidth, height: 8)
        }
        .accessibilityElement()
        .accessibilityLabel("Reading progress")
        .accessibilityValue("\(Int(progress * 100)) percent complete")
        .accessibilityRole(.progressIndicator)
    }

    private var progressWidth: CGFloat? {
        // Calculate based on available width
        nil
    }
}
```

---

## Code Organization

### Project Structure
```
MangaSpark/
├── App/
│   ├── MangaSparkApp.swift          # App entry point
│   ├── AppDelegate.swift            # App lifecycle
│   └── SceneDelegate.swift          # Scene management
├── Core/
│   ├── Data/
│   │   ├── Models/                  # Core Data models
│   │   ├── Repositories/            # Data access layer
│   │   └── Services/                # Business logic services
│   ├── Network/
│   │   ├── APIClient.swift          # Network client
│   │   ├── Endpoints.swift          # API endpoints
│   │   └── NetworkModels/           # API response models
│   └── Utilities/
│       ├── Extensions/              # Swift extensions
│       ├── Constants.swift          # App constants
│       └── Logger.swift             # Logging utility
├── Features/
│   ├── Library/
│   │   ├── Views/                   # SwiftUI views
│   │   ├── ViewModels/              # View models
│   │   └── Models/                  # Feature-specific models
│   ├── Discovery/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   └── Models/
│   └── Profile/
│       ├── Views/
│       ├── ViewModels/
│       └── Models/
├── Shared/
│   ├── Components/                  # Reusable UI components
│   ├── Modifiers/                   # Custom view modifiers
│   ├── Styles/                      # Custom styles
│   └── Resources/
│       ├── Colors.xcassets          # Color assets
│       ├── Images.xcassets          # Image assets
│       └── Localizable.strings      # Localization
└── Tests/
    ├── UnitTests/                   # Unit tests
    ├── IntegrationTests/            # Integration tests
    └── UITests/                     # UI tests
```

### File Templates
```swift
//
//  [FILENAME].swift
//  Manga Spark
//
//  Created by [AUTHOR] on [DATE].
//  Copyright © 2024 Manga Spark. All rights reserved.
//

import SwiftUI
import Combine

// MARK: - [COMPONENT NAME]

/// Brief description of what this component does
///
/// Detailed description if needed, including:
/// - Key responsibilities
/// - Usage examples
/// - Important notes or constraints
struct [COMPONENT_NAME]: View {
    // MARK: - Properties
    // Public properties first
    let publicProperty: String

    // Private properties with @State, @StateObject, etc.
    @StateObject private var viewModel = ViewModel()
    @State private var isPresented = false

    // MARK: - Initialization
    init(publicProperty: String) {
        self.publicProperty = publicProperty
    }

    // MARK: - Body
    var body: some View {
        // Main view implementation
        VStack {
            // Implementation
        }
        .onAppear {
            // Handle view appearance
        }
        .task {
            // Handle async tasks
        }
    }
}

// MARK: - View Components
extension [COMPONENT_NAME] {
    @ViewBuilder
    private var subComponent: some View {
        // Sub-component implementation
    }
}

// MARK: - Actions
extension [COMPONENT_NAME] {
    private func handleAction() {
        // Action implementation
    }
}

// MARK: - Preview
#Preview("Default") {
    [COMPONENT_NAME](publicProperty: "Sample")
}

#Preview("Alternative State") {
    [COMPONENT_NAME](publicProperty: "Alternative")
}
```

---

## Quality Assurance

### Code Review Checklist
```markdown
## Code Review Checklist

### General Code Quality
- [ ] Code follows Swift naming conventions
- [ ] Functions and classes have single responsibilities
- [ ] Complex logic is well-documented
- [ ] No force unwrapping in production code
- [ ] Proper error handling implemented

### SwiftUI Specific
- [ ] Views are properly decomposed
- [ ] State management follows best practices
- [ ] Performance considerations addressed
- [ ] Accessibility features implemented
- [ ] Preview providers included

### iOS Best Practices
- [ ] Follows iOS Human Interface Guidelines
- [ ] Supports Dynamic Type
- [ ] Handles memory management correctly
- [ ] Proper use of background/main queues
- [ ] App lifecycle events handled properly

### Testing
- [ ] Unit tests cover business logic
- [ ] UI tests cover critical user flows
- [ ] Edge cases are tested
- [ ] Mock objects used appropriately
- [ ] Test coverage is adequate (>80%)

### Architecture
- [ ] Dependencies are properly injected
- [ ] Layer separation is maintained
- [ ] Protocols used for abstraction
- [ ] Core Data best practices followed
- [ ] Network layer is secure and robust
```

### Continuous Integration
```yaml
# .github/workflows/ios.yml
name: iOS CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: macos-latest

    steps:
    - uses: actions/checkout@v3

    - name: Select Xcode version
      run: sudo xcode-select -s /Applications/Xcode_15.0.app/Contents/Developer

    - name: Cache CocoaPods
      uses: actions/cache@v3
      with:
        path: Pods
        key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
        restore-keys: ${{ runner.os }}-pods-

    - name: Install dependencies
      run: pod install

    - name: Run SwiftLint
      run: |
        if which swiftlint >/dev/null; then
          swiftlint --reporter github-actions-logging
        fi

    - name: Build and test
      run: |
        xcodebuild clean build test \
          -workspace MangaSpark.xcworkspace \
          -scheme MangaSpark \
          -destination 'platform=iOS Simulator,name=iPhone 15 Pro' \
          -enableCodeCoverage YES \
          -derivedDataPath DerivedData

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        files: ./DerivedData/Build/ProfileData/*/Coverage.profdata
```

### Performance Monitoring
```swift
// ✅ CORRECT: Performance monitoring
import os.log

final class PerformanceMonitor {
    private static let logger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "MangaSpark",
        category: "Performance"
    )

    static func measureTime<T>(
        operation: String,
        block: () throws -> T
    ) rethrows -> T {
        let startTime = CFAbsoluteTimeGetCurrent()
        defer {
            let timeElapsed = CFAbsoluteTimeGetCurrent() - startTime
            logger.info("⏱️ \(operation) took \(timeElapsed * 1000, specifier: "%.2f")ms")
        }

        return try block()
    }

    static func measureAsyncTime<T>(
        operation: String,
        block: () async throws -> T
    ) async rethrows -> T {
        let startTime = CFAbsoluteTimeGetCurrent()
        defer {
            let timeElapsed = CFAbsoluteTimeGetCurrent() - startTime
            logger.info("⏱️ \(operation) took \(timeElapsed * 1000, specifier: "%.2f")ms")
        }

        return try await block()
    }
}

// Usage example
func loadMangaLibrary() async throws -> [Manga] {
    try await PerformanceMonitor.measureAsyncTime(operation: "Load Manga Library") {
        return try await mangaService.fetchUserLibrary()
    }
}
```

This comprehensive iOS best practices guide ensures that every line of code written for Manga Spark meets the highest standards for quality, performance, accessibility, and maintainability. All agents should reference this document to maintain consistency and excellence throughout the development process.
