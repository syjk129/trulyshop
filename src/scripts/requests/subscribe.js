export function subscribe(email) {
  return new Promise((resolve, reject) => {
    const request = {
      "email": email
    };

    const http = new XMLHttpRequest();

    http.open("POST", "https://l5pr1ybjl9.execute-api.us-west-2.amazonaws.com/dev/contact", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if ((http.status === 200 || http.status === 201)) {
          if (!http.responseText) {
            resolve();
          }
          const response = JSON.parse(http.responseText);
          if (response.status != "error") {
            resolve(response.data);
          } else {
            console.log("error");
            reject(response);
          }
        } else {
          const response = JSON.parse(http.responseText);
          reject(response);
        }
      }
    }
    http.send(JSON.stringify(request));
  });
}