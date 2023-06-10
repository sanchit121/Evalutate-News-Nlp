function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  if (!Client.checkForUrl(formText)) {
    alert("URL is not valid");
    return;
  }
  console.log(formText);
  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/add", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: formText }),
  })
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById(
        "agreement"
      ).innerHTML = `Agreement: ${res.agreement}`;
      document.getElementById(
        "subjectivity"
      ).innerHTML = `Subjectivity: ${res.subjectivity}`;
      document.getElementById(
        "confidence"
      ).innerHTML = `Confidence Rating: ${res.confidence}`;
      document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
      console.log(res);
    });
}

export { handleSubmit };
