**RecommendationLevel**

```jsx
<ul>
  <li v-for="(val, key) of RecommendationLevel" v-if="isNaN(Number(val))">
    {{val}}
  </li>
</ul>
```