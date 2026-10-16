function getActiveProfile() {
    return localStorage.getItem('alex_flix_current_profile') || 'Alex';
}

document.addEventListener('DOMContentLoaded', () => {
    const activeProfile = getActiveProfile();
    const profileBadges = document.querySelectorAll('#current-profile-name');
    profileBadges.forEach(el => el.innerText = activeProfile);
    updateListCount();
});

const catalog = [
    { title: 'Overlord', category: 'anime', type: 'Anime • Isekai', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', desc: 'As táticas supremas de Momonga em um mundo de magia arcana e monstros.' },
    { title: 'Naruto Shippuden', category: 'anime', type: 'Anime • Shonen', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80', desc: 'A jornada lendária para se tornar Hokage e proteger a Vila da Folha.' },
    { title: 'Demon Slayer', category: 'anime', type: 'Anime • Fantasia', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', desc: 'Tanjiro e seus companheiros em combates espetaculares contra os Onis.' },
    { title: 'Jujutsu Kaisen', category: 'anime', type: 'Anime • Ação', img: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', desc: 'Feiticeiros modernos combatendo maldições aterrorizantes.' },
    { title: 'Attack on Titan', category: 'anime', type: 'Anime • Drama', img: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80', desc: 'A humanidade luta pela sobrevivência trancada em muralhas gigantescas.' },
    { title: 'Hunter x Hunter', category: 'anime', type: 'Anime • Aventura', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', desc: 'Gon Freecss parte em busca de seu pai para se tornar um Hunter de elite.' },
    
    { title: 'Interestelar', category: 'filme', type: 'Filme • Sci-Fi', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', desc: 'Exploração espacial através de buracos de minhoca em busca de um novo lar.' },
    { title: 'Matrix', category: 'filme', type: 'Filme • Ação', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80', desc: 'Desperte para a verdade por trás da simulação virtual que domina a humanidade.' },
    { title: 'Blade Runner 2049', category: 'filme', type: 'Filme • Cyberpunk', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', desc: 'Segredos profundos e corporações em um futuro distópico sombrio.' },

    { title: 'Cyberpunk: Edgerunners', category: 'serie', type: 'Série • Animação', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', desc: 'Mercenários cibernéticos lutando para sobreviver nas ruas implacáveis de Night City.' },
    { title: 'Stranger Things', category: 'serie', type: 'Série • Suspense', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', desc: 'Mistérios paranormais e conexões sombrias com o Mundo Invertido.' }
];

function getMyListKey() {
    return 'alex_flix_list_' + getActiveProfile();
}

let myList = JSON.parse(localStorage.getItem(getMyListKey())) || [];

function renderRow(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'min-w-[210px] md:min-w-[250px] bg-[#111318] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 transform hover:scale-105 border border-gray-800 shadow-xl relative';
        card.innerHTML = `
            <div onclick="openPlayer('${item.title}', '${item.img}', '${item.desc}')" class="h-64 md:h-72 w-full relative overflow-hidden bg-black">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:opacity-75 transition duration-500">
            </div>
            <div class="p-4 flex items-center justify-between">
                <div>
                    <h4 class="font-bold text-sm text-white truncate max-w-[150px]">${item.title}</h4>
                    <p class="text-xs text-gray-400 mt-1">${item.type}</p>
                </div>
                <button onclick="event.stopPropagation(); toggleMyList('${item.title}')" class="w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition border border-gray-700 shadow">
                    <i class="${isBookmarked(item.title) ? 'fa-solid fa-check text-red-500' : 'fa-solid fa-plus'} text-xs"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-[#111318] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 transform hover:scale-105 border border-gray-800 shadow-xl';
        card.innerHTML = `
            <div onclick="openPlayer('${item.title}', '${item.img}', '${item.desc}')" class="h-64 md:h-72 w-full relative overflow-hidden bg-black">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:opacity-75 transition duration-500">
            </div>
            <div class="p-4 flex items-center justify-between">
                <div>
                    <h4 class="font-bold text-sm text-white truncate max-w-[140px]">${item.title}</h4>
                    <p class="text-xs text-gray-400 mt-1">${item.type}</p>
                </div>
                <button onclick="event.stopPropagation(); toggleMyList('${item.title}')" class="w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition border border-gray-700 shadow">
                    <i class="${isBookmarked(item.title) ? 'fa-solid fa-check text-red-500' : 'fa-solid fa-plus'} text-xs"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderMyListPage() {
    myList = JSON.parse(localStorage.getItem(getMyListKey())) || [];
    const container = document.getElementById('grid-mylist');
    if (!container) return;
    container.innerHTML = '';
    if(myList.length === 0) {
        container.innerHTML = `<p class="text-gray-400 col-span-full text-center py-20 text-lg">A lista do perfil <b>${getActiveProfile()}</b> está vazia. Adicione seus favoritos clicando no "+" nos cards!</p>`;
        return;
    }
    myList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-[#111318] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 transform hover:scale-105 border border-gray-800 shadow-xl';
        card.innerHTML = `
            <div onclick="openPlayer('${item.title}', '${item.img}', '${item.desc}')" class="h-64 md:h-72 w-full relative overflow-hidden bg-black">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:opacity-75 transition duration-500">
            </div>
            <div class="p-4 flex items-center justify-between">
                <div>
                    <h4 class="font-bold text-sm text-white truncate max-w-[140px]">${item.title}</h4>
                    <p class="text-xs text-gray-400 mt-1">${item.type}</p>
                </div>
                <button onclick="event.stopPropagation(); toggleMyList('${item.title}'); renderMyListPage();" class="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center transition shadow">
                    <i class="fa-solid fa-check text-xs"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
    updateListCount();
}

function openPlayer(title, imgSrc, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('player-modal').classList.remove('hidden');
}

function closePlayer() {
    document.getElementById('player-modal').classList.add('hidden');
}

function toggleMyList(title) {
    myList = JSON.parse(localStorage.getItem(getMyListKey())) || [];
    const index = myList.findIndex(item => item.title === title);
    if(index > -1) {
        myList.splice(index, 1);
    } else {
        const item = catalog.find(m => m.title === title);
        if(item) myList.push(item);
    }
    localStorage.setItem(getMyListKey(), JSON.stringify(myList));
    updateListCount();
    if(document.getElementById('grid-mylist')) renderMyListPage();
}

function isBookmarked(title) {
    myList = JSON.parse(localStorage.getItem(getMyListKey())) || [];
    return myList.some(item => item.title === title);
}

function updateListCount() {
    myList = JSON.parse(localStorage.getItem(getMyListKey())) || [];
    const badges = document.querySelectorAll('#list-count');
    badges.forEach(b => b.innerText = myList.length);
}

function handleSearch(event) {
    if(event.key === 'Enter') {
        const query = event.target.value.toLowerCase();
        const found = catalog.find(item => item.title.toLowerCase().includes(query));
        if(found) {
            openPlayer(found.title, found.img, found.desc);
        } else {
            alert('Nenhum título encontrado com esse nome.');
        }
    }
}

function toggleProfileMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

window.addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
    }
});