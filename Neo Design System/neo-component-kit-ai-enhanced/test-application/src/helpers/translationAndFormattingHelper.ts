export function translateAndFormat(stringId: string, params?: object) {
  let local = "en";
  if (window.location.hash.includes("lang=fr")) {
    local = "fr";
  }
  const researchedString = getString(local, stringId);
  if (!researchedString) {
    throw new Error("No wording was found for the id: " + stringId);
  }
  return formatString(researchedString, params);
}

function getString(local: string, stringId: string): string {
  if (
    translatedAndFormattedStrings[local]
      ? translatedAndFormattedStrings[local][stringId]
      : false
  ) {
    return translatedAndFormattedStrings[local][stringId];
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatString(stringToFormat: string, params: any): string {
  for (const p in params) {
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      stringToFormat = stringToFormat.replace("__" + p + "__", params[p]);
    }
  }
  return stringToFormat;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translatedAndFormattedStrings: any = {
  en: {
    numberResultsAreAvailable: "__number__ results are available.",
    paginationFooterTrips: "__min__ - __max__ of __total__ trips",
    paginationFooter: "__min__ - __max__ of __total__",
    paginationPageNumber: "Page __pageNumber__",
    tabsMore: "__count__ more",
    dateFormatInvalid: "Date format is __format__",
    timeFormatInvalid: "Select or input a valid time. The expected time format is __format__",
    datesOrderInvalidForStartDate: "__startRangeLabel__ must be sooner than __endRangeLabel__",
    datesOrderInvalidForEndDate: "__endRangeLabel__ must be later than __startRangeLabel__",
    searchForArbitraryInput: "Search for \"__arbitraryInput__\"",
    dateFormatExplanationWording: "Date format",
    timeFormatExplanationWording: "Time format",
    numberOfTimeOptionsWording: "__number__ time options"
  },
  fr: {
    numberResultsAreAvailable: "__number__ résultats disponibles.",
    paginationFooterTrips: "__min__ - __max__ sur __total__ voyages",
    paginationFooter: "__min__ - __max__ sur __total__",
    paginationPageNumber: "Page __pageNumber__",
    tabsMore: "__count__ de plus",
    dateFormatInvalid: "Le format de date est __format__",
    timeFormatInvalid: "Veuillez sélectionner ou saisir un horaire valide. Le format attendu est __format__",
    datesOrderInvalidForStartDate: "__startRangeLabel__ doit être antérieure à __endRangeLabel__",
    datesOrderInvalidForEndDate: "__endRangeLabel__ doit être postérieure à __startRangeLabel__",
    searchForArbitraryInput: "Chercher \"__arbitraryInput__\"",
    dateFormatExplanationWording: "Format de date",
    timeFormatExplanationWording: "Format d'horaire",
    numberOfTimeOptionsWording: "__number__ options d'horaire"
  }
};
