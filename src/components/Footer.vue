<template>
  <footer class="footer grid grid-cols-3 content-center justify-center gap-2">
    <div class="footer__addr col-span-3">
      <h1 class="footer__logo">
        Musicality
      </h1>
    </div>

    <!-- <ul class="footer__nav block "> -->
    <li class="nav__item">
      <h2 class="nav__title">
        {{ $t('footer.Media') }}
      </h2>

      <ul class="nav__ul">
        <li>
          <a href="#">{{ $t('footer.Online') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.Print') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.AlternativeAds') }}</a>
        </li>
      </ul>
    </li>

    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">
        {{ $t('footer.Company') }}
      </h2>

      <ul class="nav__ul">
        <li>
          <a href="#">{{ $t('footer.WhatIsMusicality') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.Partners') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.Careers') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.Press') }}</a>
        </li>
      </ul>
    </li>

    <li class="nav__item">
      <h2 class="nav__title">
        {{ $t('footer.Account') }}
      </h2>

      <ul class="nav__ul">
        <li>
          <a href="#">{{ $t('footer.SignUp') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.RedeemVoucher') }}</a>
        </li>

        <li>
          <a href="#">{{ $t('footer.RedeemGiftcard') }}</a>
        </li>
      </ul>
    </li>
    <!-- </ul> -->
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

.footer {
  /* display: flex;
  flex-flow: row wrap; */
  padding: 30px 30px 80px 30px;
  color: white;
  background-color: black;
  grid-template-rows: 1fr 3fr;
}

/* .footer > * {
  flex:  1 100%;
} */

.footer__logo {
  font-weight: 500;
  font-size: 2rem;
}

.nav__title {
  font-weight: 400;
  font-size: 15px;
}

li {
  list-style: none;
  padding-left: 0;
}

.footer li {
  line-height: 2em;
}

.footer a {
  text-decoration: none;
}

.footer a:hover {
  color: #20d862;
}
.footer__nav {
  display: flex;
  margin-top: 4rem;
  margin-left: 1rem;
  margin-bottom: 2.5rem;
  justify-content: center;
}

.nav__ul a {
  color: #999;
}

@media screen and (min-width: 40.375em) {
  .footer__nav > * {
    flex: 1;
  }

  .footer__nav {
    flex: 2 0px;
  }
}
</style>
