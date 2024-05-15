<template>
  <div class="w-[100vw] h-[100vh] flex items-center justify-center">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f1f1f1;
}

.loader {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
  animation: animate 1.2s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
}

.loader span:nth-child(1) {
  filter: blur(5px);
}

.loader span:nth-child(2) {
  filter: blur(10px);
}

.loader span:nth-child(3) {
  filter: blur(25px);
}

.loader span:nth-child(4) {
  filter: blur(50px);
}

.loader:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background: #f1f1f1;
  border: solid white 0px;
  border-radius: 50%;
}
</style>
