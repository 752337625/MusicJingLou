<template>
  <div class="loading__container">
    <div class="bear">
      <div class="bear__ears">
        <div class="bear__ears__left ear"></div>
        <div class="bear__ears__right ear"></div>
      </div>
      <div class="bear__body">
        <div class="bear__eyes">
          <div class="bear__eyes--left eye"></div>
          <div class="bear__eyes--right eye"></div>
        </div>
        <div class="bear__nose">
          <div class="bear__nose--inner"></div>
        </div>
      </div>
    </div>
    <div class="shadow"></div>
  </div>
</template>
<style lang="less" scoped>
  .loading__container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -webkit-app-region: drag;
  }

  .bear {
    width: 240px;
    animation: updown 2s infinite alternate;
    &__ears {
      display: flex;
      justify-content: space-between;
      animation: updown 2s infinite alternate;
      transform: translateY(10px);
      .ear {
        width: 50px;
        height: 60px;
        background: #ec4141;
      }
      &__left {
        border-radius: 50% 100%;
      }
      &__right {
        border-radius: 100% 50%;
      }
    }
    &__body {
      width: 100%;
      height: 230px;
      background: #ec4141;
      border-radius: 50% / 40% 40% 60% 60%;
    }
    &__eyes {
      display: flex;
      justify-content: space-around;
      position: relative;
      transform: translateY(60px);
      transition: all 0.3s linear;
      .eye {
        width: 20px;
        background: #fff;
        height: 15px;
        position: absolute;
        border-radius: 50% / 40% 40% 60% 60%;
        animation: blink 0.5s infinite alternate;
        transition: all 0.3s ease;
      }
      &--left {
        left: 50px;
        transform: skewY(5deg);
      }
      &--right {
        right: 50px;
        transform: skewY(-5deg);
      }
    }
    &__nose {
      width: 80px;
      background: #fff;
      height: 100px;
      margin: auto;
      transform: translateY(80px);
      border-radius: 50% / 60% 60% 30% 30%;
      position: relative;
      animation: moveNose 3s infinite;
      transition: 0.4s ease;
      &--inner {
        width: 50px;
        height: 26px;
        background: #ec4141;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50% / 40% 40% 60% 60%;
        animation: flip 0.5s infinite alternate;
        &:after {
          content: '';
          width: 20px;
          height: 20px;
          background: #ec4141;
          position: absolute;
          bottom: -6px;
          left: 50%;
          border-radius: 50px;
          transform: translate(-50%);
          box-shadow: 20px 5px 0 #fff, -20px 5px 0 #fff;
        }
      }
    }
  }
  .shadow {
    width: 200px;
    height: 30px;
    // margin: auto;
    margin-top: -20px;
    background: #ec4141;
    opacity: 0.6;
    display: block;
    border-radius: 100%;
    transform: translateY(60px);
    filter: blur(17px);
    animation: shadow 2s infinite alternate;
  }

  @keyframes updown {
    to {
      transform: translateY(40px);
    }
  }

  @keyframes blink {
    from {
      height: 0;
    }
    to {
      height: 15px;
    }
  }

  @keyframes moveNose {
    0%,
    100%,
    90% {
      transform: translateY(80px);
    }
    20%,
    30% {
      transform: translate(20px, 60px);
    }
    60%,
    70% {
      transform: translate(-20px, 60px);
    }
  }

  @keyframes shadow {
    from {
      width: 200px;
    }
    to {
      width: 150px;
    }
  }
</style>
