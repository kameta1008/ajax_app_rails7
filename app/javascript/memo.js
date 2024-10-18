const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // 既定のイベントを無効化（イベントのダブり解消）
    const formData = new FormData(form);
    // 変数formDataを定義、フォームから情報を取得するFormDataオブジェクトを使って
    const XHR = new XMLHttpRequest();
    // jsでHTTP通信をする時に利用するオブジェクト
    XHR.open("POST", "/posts", true);
    // openメソッドでHTTPメソッドとパスと非同期通信がtrueを設定
    XHR.responseType = "json";
    // jsonでのレスポンスを指定、jsonはデータでのレスポンス
    XHR.send(formData);
    // sendメソッドはリクエストを送る役割
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";


    };
    // リクエストの送信に成功した時、
  });
};
window.addEventListener('turbo:load', post); 