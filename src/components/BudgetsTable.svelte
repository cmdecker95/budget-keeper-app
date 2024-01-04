<script lang="ts">
  import type { BudgetRecord } from "@server/xata";

  export let budgets: BudgetRecord[];
</script>

{#each budgets as budget}
  <div class="p-8 m-8 rounded border border-white/10 shadow">
    <a
      href={`/budgets/${budget.id}`}
      class="hover:text-emerald-400 focus:text-emerald-400 duration-150"
    >
      {budget.name}
    </a>
  </div>
{/each}
