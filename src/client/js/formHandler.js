function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  // Client.checkForName(formText);
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
      document.getElementById("agreement").innerHTML = res.agreement;
      document.getElementById("subjectivity").innerHTML = res.subjectivity;
      document.getElementById(
        "confidence"
      ).innerHTML = `Confidence Rating: ${res.confidence}`;
      document.getElementById("irony").innerHTML = res.irony;
    });
}

export { handleSubmit };
