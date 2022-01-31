<template>
  <table>
    <thead>
      <tr>
        <th colspan="2">The table header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The table body</td>
        <td>with two columns</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
}
</script>

<style scoped lang="scss">
  table,
  td {
    border: 1px solid #333;
  }

  thead,
  tfoot {
    background-color: #333;
    color: #fff;
  }
</style>
