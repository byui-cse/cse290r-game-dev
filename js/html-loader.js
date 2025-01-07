function loadHTML(file, tagName) {
  if (window.fetch) {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        document.getElementsByTagName(tagName)[0].innerHTML = html;
      })
      .catch(err => console.error(`Error loading ${file}:`, err));
  } else {
    // Fallback to XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'example.html');
    xhr.onload = () => {
      if (xhr.status === 200) {
        document.getElementsByTagName(tagName)[0].innerHTML = xhr.responseText;
      } else {
        console.error('XHR error:', xhr.statusText);
      }
    };
    xhr.onerror = () => console.error('XHR network error');
    xhr.send();
  }
}

// Load header, menu (sidebar), and footer
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('inc/header.html', 'header');
  loadHTML('inc/menu.html', 'nav');
  loadHTML('inc/footer.html', 'footer');
});
