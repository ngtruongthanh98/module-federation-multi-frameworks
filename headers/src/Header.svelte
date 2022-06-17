<script>
    let count = 0;
    window.addToCount = () => {
      count += 1;
    }
    window.deleteToCount = () => {
      count -= 1;
    }
  </script>

<header class="m-2 flex p-5 bg-blue-500">
    <div class="flex-1">Svelte Header</div>
    <div class="text-white">Count : {count}</div>
</header>