<template>
  <div class="big_model_option_view">
    <div class="left">
      <router-link :to="{ name: 'role_list' }">角色列表</router-link>
      <router-link :to="{ name: 'role_tag' }">角色标签</router-link>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.big_model_option_view {
  display: flex;

  > .left {
    width: 160px;
    height: calc(100vh - 130px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    a {
      color: var(--color-text-2);
      text-decoration: none;
      display: flex;
      border-radius: 5px;
      background-color: var(--color-fill-2);
      height: 50px;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }
    a.router-link-exact-active {
      background-color: var(--active);
      color: white;
    }
  }

  > .right {
    width: calc(100% - 180px);
    min-height: calc(100vh - 130px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    margin-left: 20px;
  }
}
</style>
