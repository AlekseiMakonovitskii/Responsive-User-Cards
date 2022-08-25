const app = function () {
  const container = document.querySelector(`.container`);
  const users = [];

  const loadUsers = () => {
    return new Promise((resolve, reject) => {
      const res = fetch(`https://random-data-api.com/api/v2/users`);

      if (res) {
        resolve(res);
      } else {
        reject(new Error(`Users not found`));
      }
    });
  };

  const renderUsers = user => {
    const html = `
      <div class="card">
            <div class="card-container">
              <div class="avatar-container">
                <img src="${user.avatar}" alt="">
              </div>
              <div class="info-container">
                <h1>${user[`first_name`]} ${user[`last_name`]}</h1>
                <div class="email icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                    />
                  </svg>
                  <p>${user.email}</p>
                </div>
                <div class="phone icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"
                    />
                  </svg>
                  <p>${user[`phone_number`]}</p>
                </div>
                <div class="website icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M0 256C0 209.4 12.47 165.6 34.27 127.1L144.1 318.3C166 357.5 207.9 384 256 384C270.3 384 283.1 381.7 296.8 377.4L220.5 509.6C95.9 492.3 0 385.3 0 256zM365.1 321.6C377.4 302.4 384 279.1 384 256C384 217.8 367.2 183.5 340.7 160H493.4C505.4 189.6 512 222.1 512 256C512 397.4 397.4 511.1 256 512L365.1 321.6zM477.8 128H256C193.1 128 142.3 172.1 130.5 230.7L54.19 98.47C101 38.53 174 0 256 0C350.8 0 433.5 51.48 477.8 128V128zM168 256C168 207.4 207.4 168 256 168C304.6 168 344 207.4 344 256C344 304.6 304.6 344 256 344C207.4 344 168 304.6 168 256z"
                    />
                  </svg>
                  <p>${user.address.country}</p>
                </div>
              </div>
            </div>
          </div>
    `;

    document.querySelector(`.load-line`).style.display = `none`;
    container.insertAdjacentHTML(`afterbegin`, html);
  };

  const setUsersAmount = num => {
    for (let i = 0; i <= num; i++) {
      users.push(loadUsers());
    }
  };
  setUsersAmount(49);

  Promise.all(users)
    .then(res => Promise.all(res.map(el => el.json())))
    .then(result => result.forEach(el => renderUsers(el)))
    .catch(err => console.log(err));
};

app();
