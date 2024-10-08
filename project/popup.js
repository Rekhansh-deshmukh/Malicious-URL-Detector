function sendTabUrlToFlask(tabUrl) {
  fetch('http://localhost:3000/predict', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: tabUrl }),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
getTabUrl(sendTabUrlToFlask);
