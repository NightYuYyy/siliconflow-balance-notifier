window.electronAPI.onNotifyData((data) => {
    document.getElementById('title').innerText = data.title;
    document.getElementById('message').innerText = data.message;

    const buttons = document.getElementById('buttons');
    data.actions.forEach(action => {
        const btn = document.createElement('button');
        btn.innerText = action;
        btn.onclick = () => {
            window.electronAPI.sendClick(action);
            window.close();
        };
        buttons.appendChild(btn);
    });
});
