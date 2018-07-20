import '../css/style.css';

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const copyButton = document.querySelector('#copy');
copyButton.addEventListener('click', e => {
    const text = document.querySelector('#app').innerHTML;
    copyToClipboard(text);
});
