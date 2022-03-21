components = {
  register: `<div id="app__icon">
  Hi
  <i class="fa-brands fa-rocketchat"></i>
</div>
<div class="form__container">
  <form class="form__register">
    <div class="form__register-header">
      <h1 class="form__register-heading">Hello, friend!</h1>
      <p>Create your free account</p>
      <div id="message"></div>
    </div>
    <div class="form__register-body">
      <div class="form__register-wrap">
        <input
          name="username"
          type="text"
          class="form__register-input"
          placeholder="Username"
        />
        <span id="username__err" class="messenger__err"></span>
      </div>

      <div class="form__register-wrap">
        <input
          name="email"
          type="text"
          class="form__register-input"
          placeholder="Email"
        />
        <span id="email__err" class="messenger__err"></span>
      </div>

      <div class="form__register-wrap">
        <input
          name="password"
          type="password"
          class="form__register-input"
          placeholder="Password"
        />
        <span id="password__err" class="messenger__err"></span>
      </div>

      <div class="form__register-wrap">
        <input
          name="confirmPassword"
          type="password"
          class="form__register-input"
          placeholder="Confirm password"
        />
        <span id="confirm-password__err" class="messenger__err"></span>
      </div>

      <button type="submit" class="btn form__register-btn">
        Register
      </button>
    </div>
    <div class="form__register-footer">
      <span
        >Already have an account?
        <a href="#" class="form__register-footer-link">Sign in</a></span
      >
    </div>
  </form>
  <div class="form__content">
    <h1 class="form__content-heading">Glad to see you!</h1>
  </div>
</div>`,
  login: `<div id="app__icon">
  Hi
  <i class="fa-brands fa-rocketchat"></i>
</div>
<div class="form__container">
  <div class="form__content">
    <h1 class="form__content-heading">Welcom Back!</h1>
  </div>
  <form class="form__login">
    <div class="form__login-header">
      <h1 class="form__login-heading">Hello!</h1>
      <p>Sign in to your account</p>
      <div id="message"></div>
    </div>
    <div class="form__login-body">
      <div class="form__login-wrap">
        <input
          name="email"
          type="text"
          class="form__login-input"
          placeholder="Email"
        />
        <span id="email__err" class="messenger__err"></span>
      </div>

      <div class="form__login-wrap">
        <input
          name="password"
          type="password"
          class="form__login-input"
          placeholder="Password"
        />
        <span id="password__err" class="messenger__err"></span>
      </div>

      <div class="form__login-checkbox">
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          value="agree"
        />
        <label for="checkbox">Remember me</label>
      </div>
      <a href="#" class="forgot__password">Forgot password?</a>
      <button type="submit" class="btn form__login-btn">Login</button>
    </div>
    <div class="form__login-footer">
      <span
        >Create your free account |
        <a href="#" class="form__login-footer-link">Sign up</a></span
      >
    </div>
  </form>
</div>`,

  chat: `
  <nav class="main-nav">
      <div class="user-profile">
        <div class="user-email"></div>
        <button class="btn-icon">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </nav>
    <section class="chat-container">
      <section class="aside-left">
        <div class="list-conversations">
          
        </div>
        <form action="" class="form-add-conversation">
          <div class="input-wrapper">
            <input
              type="text"
              name="title"
              placeholder="Enter new conversation title"
            />
            </div>
            <span id="title-err" class="messenger__err"></span>
          <div class="input-wrapper">
            <input
              type="text"
              name="friendEmail"
              placeholder="Enter your friend email"
            />
            </div>
            <span id="friend-email-err" class="messenger__err"></span>
          <button class="btn-icon"><i class="fa-solid fa-plus"></i></button>
        </form>
      </section>
      <div class="current-conversation">
        <div class="list-message"></div>
        <form action="" class="form-add-message">
          <div class="input-wrapper">
            <input
              type="text"
              name="message"
              placeholder="Enter your message..."
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <section class="aside-right">
        <div class="current-conversation-details">
          <div class="details-title">
                              
          </div>
          <div class="details-list-email">
           
            </div>
            <div class="details-created-at"></div>
        </div>
        <div class="btn-wrap">
        </div>
      </section>
    </section>
  `,
};
