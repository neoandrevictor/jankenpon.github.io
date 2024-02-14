let musicas = ['stone.mid', 'paper.mid'];
let musicaSelecionada = musicas[Math.floor(Math.random() * musicas.length)];


function playMidi(fileName) {
    let urlSite = window.location.href;

    if (urlSite == "https://neoandrevictor.github.io/jankenpon.github.io/") {

        var url = 'https://neoandrevictor.github.io/jankenpon.github.io/music/' + fileName; // Concatenando o caminho da pasta music com o nome do arquivo
    } else {
        var url = '/music/' + fileName; // Concatenando o caminho da pasta music com o nome do arquivo

    }

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            var blob = new Blob([arrayBuffer], { type: 'audio/midi' });
            var url = URL.createObjectURL(blob);
            MIDIjs.play(url);
        })
        .catch(error => {
            console.error('Error loading MIDI file:', error);
        });
}

function stopMidi() {
    MIDIjs.stop();
}

function togglePlay() {
    let button = document.getElementById('toggleButton');
    if (button.innerText == '🔈') {
        stopMidi();
        button.innerText = '🔇';
    } else {
        playMidi(musicaSelecionada); // Substitua 'nome_do_arquivo.mid' pelo nome do seu arquivo MIDI
        button.innerText = '🔈';
    }
}