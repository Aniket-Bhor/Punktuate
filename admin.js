const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'punktuate123'
};

const STORAGE_KEYS = {
    INFLUENCERS: 'punktuate_influencers',
    EVENTS: 'punktuate_events',
    FOUNDERS: 'punktuate_founders',
    FACES: 'punktuate_faces',
    CAREERS: 'punktuate_careers',
    ANNOUNCEMENTS: 'punktuate_announcements',
    JOURNALS: 'punktuate_journals',
    SESSION: 'punktuate_admin_session'
};

let influencers = [];
let events = [];
let founders = [];
let faces = [];
let careers = [];
let announcements = [];
let journals = [];
let currentSection = 'influencers';

function checkAuth() {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    showToast('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function getDefaultInfluencers() {
    return [
        {
            id: '1',
            name: 'Vartika Vashista',
            username: 'vartikavashista',
            followers: '50K',
            bio: 'Fashion & lifestyle influencer based in Mumbai',
            link: 'https://instagram.com/vartikavashista',
            image: 'Influencers/Vartika Vashista/Vartika.jpeg',
            platform: 'Instagram'
        },
        {
            id: '2',
            name: 'Aditi Fadtare',
            username: 'aditifadtare',
            followers: '35K',
            bio: 'Content creator & digital marketer',
            link: 'https://instagram.com/aditifadtare',
            image: 'Influencers/Aditi Fadtare/Aditi.jpeg',
            platform: 'Instagram'
        },
        {
            id: '3',
            name: 'Dhanshri Dake',
            username: 'dhanshridake',
            followers: '28K',
            bio: 'Lifestyle & travel influencer',
            link: 'https://instagram.com/dhanshridake',
            image: 'Influencers/Dhanshri Dake/Dhanashri.jpeg',
            platform: 'Instagram'
        },
        {
            id: '4',
            name: 'Osbert Dsouza',
            username: 'osbertdsouza',
            followers: '42K',
            bio: 'Fitness & wellness content creator',
            link: 'https://instagram.com/osbertdsouza',
            image: 'Influencers/Osbert Dsouza/Osbert.jpeg',
            platform: 'Instagram'
        },
        {
            id: '5',
            name: 'Shruti Dange',
            username: 'shrutidange',
            followers: '38K',
            bio: 'Beauty & fashion influencer',
            link: 'https://instagram.com/shrutidange',
            image: 'Influencers/Shruti Dange/Shruti Dange.jpeg',
            platform: 'Instagram'
        }
    ];
}

function getDefaultAnnouncements() {
    return [
        {
            id: '1',
            text: 'The Phoolish Concert by Apurva Bondre – 13th June, Mumbai'
        }
    ];
}

function getDefaultJournals() {
    return [
        {
            id: '1',
            title: 'Why Most Influencer Campaigns Fail.',
            readTime: '3 min read',
            description: '(And how we fix broken execution)',
            link: 'influencer-campaigns-fail.html',
            image: ''
        },
        {
            id: '2',
            title: 'Creators Don’t Miss Deadlines. Systems Do.',
            readTime: '4 min read',
            description: '',
            link: 'systems-not-creators.html',
            image: ''
        }
    ];
}

function getDefaultFounders() {
    return [
        {
            id: '1',
            name: 'Arya Pawar',
            title: 'Co-Founder, Punktuate',
            image: 'aryapic.png'
        },
        {
            id: '2',
            name: 'Avanti Thakur',
            title: 'Co-Founder, Punktuate',
            image: '_ASH7503.jpeg'
        }
    ];
}

function getDefaultFaces() {
    return [];
}

function getDefaultCareers() {
    return [
        {
            id: '1',
            position: 'Graphic Designer',
            email: 'aryapawar@punktuate.in'
        },
        {
            id: '2',
            position: 'Video Editor',
            email: 'aryapawar@punktuate.in'
        }
    ];
}

function loadInfluencers() {
    const stored = localStorage.getItem(STORAGE_KEYS.INFLUENCERS);
    const defaultInfluencers = getDefaultInfluencers();
    
    if (stored) {
        influencers = JSON.parse(stored);
        if (influencers.length < 5) {
            influencers = defaultInfluencers;
            saveInfluencers();
        }
    } else {
        influencers = defaultInfluencers;
        saveInfluencers();
    }
}

function loadEvents() {
    const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (stored) {
        events = JSON.parse(stored);
    } else {
        events = [];
        saveEvents();
    }
}

function loadAnnouncements() {
    const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    const defaultAnnouncements = getDefaultAnnouncements();
    
    if (stored) {
        announcements = JSON.parse(stored);
    } else {
        announcements = defaultAnnouncements;
        saveAnnouncements();
    }
}

function loadJournals() {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNALS);
    const defaultJournals = getDefaultJournals();
    
    if (stored) {
        journals = JSON.parse(stored);
    } else {
        journals = defaultJournals;
        saveJournals();
    }
}

function loadFounders() {
    const stored = localStorage.getItem(STORAGE_KEYS.FOUNDERS);
    const defaultFounders = getDefaultFounders();
    
    if (stored) {
        founders = JSON.parse(stored);
    } else {
        founders = defaultFounders;
        saveFounders();
    }
}

function loadData() {
    loadInfluencers();
    loadEvents();
    loadFounders();
    loadFaces();
    loadCareers();
    loadAnnouncements();
    loadJournals();
}

function loadCareers() {
    const stored = localStorage.getItem(STORAGE_KEYS.CAREERS);
    const defaultCareers = getDefaultCareers();
    
    if (stored) {
        careers = JSON.parse(stored);
    } else {
        careers = defaultCareers;
        saveCareers();
    }
}

function saveCareers() {
    localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify(careers));
}

function loadFaces() {
    const stored = localStorage.getItem(STORAGE_KEYS.FACES);
    const defaultFaces = getDefaultFaces();
    
    if (stored) {
        faces = JSON.parse(stored);
    } else {
        faces = defaultFaces;
        saveFaces();
    }
}

function saveInfluencers() {
    localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));
}

function saveEvents() {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

function saveFounders() {
    localStorage.setItem(STORAGE_KEYS.FOUNDERS, JSON.stringify(founders));
}

function saveFaces() {
    localStorage.setItem(STORAGE_KEYS.FACES, JSON.stringify(faces));
}

function saveAnnouncements() {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
}

function saveJournals() {
    localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(journals));
}

function renderInfluencers() {
    const container = document.getElementById('influencers-list');
    if (!container) return;
    
    if (influencers.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-user text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Influencers Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first influencer</p>
                <button onclick="openModal('add-influencer')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Influencer
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = influencers.map(inf => `
        <div class="glass rounded-[40px] p-6 border border-white/10 hover-card relative overflow-hidden group">
            <div class="flex items-start gap-4 mb-6 relative z-10">
                <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 flex-shrink-0">
                    <img src="${inf.image || 'placeholder.jpg'}" class="w-full h-full object-cover" alt="${inf.name}">
                </div>
                <div class="flex-1 min-w-0 pr-20">
                    <h3 class="text-xl font-bold uppercase line-clamp-1 mb-1">${inf.name}</h3>
                    <p class="text-[#D4AF37] text-sm truncate">@${inf.username}</p>
                </div>
            </div>
            
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button onclick="editInfluencer('${inf.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-edit text-lg"></i>
                </button>
                <button onclick="deleteInfluencer('${inf.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-trash text-lg"></i>
                </button>
            </div>
            
            <div class="relative z-10">
                <p class="text-white/40 text-sm mb-3">${inf.followers} followers</p>
                <p class="text-white/60 text-sm line-clamp-2">${inf.bio}</p>
            </div>
        </div>
    `).join('');
}

function renderEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-calendar-event text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Events Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first event</p>
                <button onclick="openModal('add-event')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Event
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = events.map(evt => `
        <div class="glass rounded-[40px] overflow-hidden border border-white/10 hover-card relative group">
            <div class="h-48 overflow-hidden bg-white/5 relative">
                ${evt.image ? `<img src="${evt.image}" class="w-full h-full object-cover" alt="${evt.name}">` : `<div class="w-full h-full flex items-center justify-center text-white/20"><i class="bx bx-calendar text-5xl"></i></div>`}
            </div>
            <div class="p-6 relative z-10">
                <div class="flex items-start gap-4 mb-4">
                    <div class="flex-1 min-w-0">
                        <h3 class="text-xl font-bold uppercase mb-2 line-clamp-1">${evt.name}</h3>
                        <p class="text-[#D4AF37] text-sm font-medium">${formatDate(evt.date)}</p>
                    </div>
                </div>
                <p class="text-white/40 text-sm mb-2">${evt.location}</p>
                <p class="text-white/60 text-sm line-clamp-2">${evt.description}</p>
            </div>
            
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button onclick="editEvent('${evt.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-edit text-lg"></i>
                </button>
                <button onclick="deleteEvent('${evt.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-trash text-lg"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderAnnouncements() {
    const container = document.getElementById('announcements-list');
    if (!container) return;
    
    if (announcements.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-bell text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Announcements Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first announcement</p>
                <button onclick="openModal('add-announcement')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Announcement
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = announcements.map(ann => `
        <div class="glass rounded-[40px] p-6 border border-white/10 hover-card relative group overflow-hidden">
            <div class="relative z-10">
                <div class="flex items-start justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <i class="bx bx-bell text-2xl text-[#D4AF37]"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-white/60 luxury-caption text-[10px] mb-1">Announcement</p>
                            <p class="text-xl font-bold">${ann.text}</p>
                        </div>
                    </div>
                </div>
                
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <button onclick="editAnnouncement('${ann.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                        <i class="bx bx-edit text-lg"></i>
                    </button>
                    <button onclick="deleteAnnouncement('${ann.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                        <i class="bx bx-trash text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderJournals() {
    const container = document.getElementById('journals-list');
    if (!container) return;
    
    if (journals.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-book text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Journals Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first journal</p>
                <button onclick="openModal('add-journal')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Journal
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = journals.map(jrn => `
        <div class="glass rounded-[40px] overflow-hidden border border-white/10 hover-card relative group">
            <div class="aspect-video bg-white/5 relative overflow-hidden">
                ${jrn.image ? `<img src="${jrn.image}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="${jrn.title}">` : `<div class="w-full h-full bg-gradient-to-tr from-[#000B3D] via-blue-900 to-[#D4AF37]/20"></div>`}
            </div>
            <div class="p-6 relative z-10">
                <p class="text-[#D4AF37] luxury-caption text-[10px] mb-3 opacity-60">${jrn.readTime || '3 min read'}</p>
                <h3 class="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition-all">${jrn.title}</h3>
                <p class="text-white/40 text-sm">${jrn.description}</p>
            </div>
            
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button onclick="editJournal('${jrn.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-edit text-lg"></i>
                </button>
                <button onclick="deleteJournal('${jrn.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-trash text-lg"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderFounders() {
    const container = document.getElementById('founders-list');
    if (!container) return;
    
    if (founders.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-group text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Founders Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first founder</p>
                <button onclick="openModal('add-founder')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Founder
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = founders.map(fdr => `
        <div class="glass rounded-[40px] p-6 border border-white/10 hover-card relative overflow-hidden group">
            <div class="flex items-start gap-4 mb-6 relative z-10">
                <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 flex-shrink-0">
                    <img src="${fdr.image || 'placeholder.jpg'}" class="w-full h-full object-cover" alt="${fdr.name}">
                </div>
                <div class="flex-1 min-w-0 pr-20">
                    <h3 class="text-xl font-bold uppercase line-clamp-1 mb-1">${fdr.name}</h3>
                    <p class="text-[#D4AF37] text-sm truncate">${fdr.title}</p>
                </div>
            </div>
            
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button onclick="editFounder('${fdr.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-edit text-lg"></i>
                </button>
                <button onclick="deleteFounder('${fdr.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-trash text-lg"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderFaces() {
    const container = document.getElementById('faces-list');
    if (!container) return;
    
    if (faces.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-smile text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Faces Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first face</p>
                <button onclick="openModal('add-face')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Face
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = faces.map(f => `
        <div class="glass rounded-[40px] p-6 border border-white/10 hover-card relative overflow-hidden group">
            <div class="flex items-start gap-4 mb-6 relative z-10">
                <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 flex-shrink-0">
                    <img src="${f.image || 'placeholder.jpg'}" class="w-full h-full object-cover" alt="${f.name}">
                </div>
                <div class="flex-1 min-w-0 pr-20">
                    <h3 class="text-xl font-bold uppercase line-clamp-1 mb-1">${f.name}</h3>
                    <p class="text-[#D4AF37] text-sm truncate">${f.role}</p>
                </div>
            </div>
            
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button onclick="editFace('${f.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-edit text-lg"></i>
                </button>
                <button onclick="deleteFace('${f.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                    <i class="bx bx-trash text-lg"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderCareers() {
    const container = document.getElementById('careers-list');
    if (!container) return;
    
    if (careers.length === 0) {
        container.innerHTML = `
            <div class="col-span-full glass rounded-[40px] p-12 border border-white/10 text-center">
                <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                    <i class="bx bx-briefcase text-5xl text-white/30"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">No Careers Yet</h3>
                <p class="text-white/40 mb-8">Get started by adding your first job post</p>
                <button onclick="openModal('add-career')" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-4 rounded-full luxury-caption text-[10px] font-extrabold">
                    Add First Career
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = careers.map(c => `
        <div class="glass p-12 rounded-[40px] flex flex-col md:flex-row justify-between items-center group hover:border-[#D4AF37]/50 transition-all cursor-pointer border border-white/5 relative overflow-hidden">
            <h3 class="text-3xl font-bold">${c.position}</h3>
            <div class="flex items-center gap-6">
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <button onclick="event.stopPropagation(); editCareer('${c.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all backdrop-blur-md border border-white/10">
                        <i class="bx bx-edit text-lg"></i>
                    </button>
                    <button onclick="event.stopPropagation(); deleteCareer('${c.id}')" class="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-md border border-white/10">
                        <i class="bx bx-trash text-lg"></i>
                    </button>
                </div>
                <span class="luxury-caption text-[11px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all">Mail your resume</span>
                <button class="bg-white/10 p-6 rounded-full group-hover:bg-[#D4AF37] transition-all"><i data-lucide="mail"></i></button>
            </div>
        </div>
    `).join('');
}

function renderAll() {
    renderInfluencers();
    renderEvents();
    renderFounders();
    renderFaces();
    renderCareers();
    renderAnnouncements();
    renderJournals();
}

function showSection(section) {
    currentSection = section;
    
    document.querySelectorAll('section').forEach(el => el.classList.add('hidden'));
    const sectionEl = document.getElementById(`${section}-section`);
    if (sectionEl) sectionEl.classList.remove('hidden');
    
    document.querySelectorAll('.sidebar-link').forEach(el => el.classList.remove('active'));
    document.getElementById(`nav-${section}`)?.classList.add('active');
    document.getElementById(`nav-mobile-${section}`)?.classList.add('active');
    
    const titles = {
        influencers: { title: 'Influencers', subtitle: 'manage your creators', btn: 'Add Influencer', action: 'add-influencer' },
        events: { title: 'Events', subtitle: 'manage your events', btn: 'Add Event', action: 'add-event' },
        founders: { title: 'Founders', subtitle: 'manage your founders', btn: 'Add Founder', action: 'add-founder' },
        faces: { title: 'The Faces', subtitle: 'the faces behind punktuate', btn: 'Add Face', action: 'add-face' },
        careers: { title: 'Careers', subtitle: 'manage your job posts', btn: 'Add Career', action: 'add-career' },
        announcements: { title: 'Announcements', subtitle: 'manage your announcements', btn: 'Add Announcement', action: 'add-announcement' },
        journals: { title: 'The Journal', subtitle: 'manage your journal', btn: 'Add Journal', action: 'add-journal' }
    };
    
    const config = titles[section];
    document.getElementById('section-title').textContent = config.title;
    document.getElementById('section-subtitle').textContent = config.subtitle;
    document.getElementById('add-btn').innerHTML = `<i class="bx bx-plus"></i> ${config.btn}`;
    document.getElementById('add-btn').onclick = () => openModal(config.action);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

function openModal(type) {
    const modalMap = {
        'add-influencer': { modal: 'influencer-modal', title: 'Add Influencer' },
        'edit-influencer': { modal: 'influencer-modal', title: 'Edit Influencer' },
        'add-event': { modal: 'event-modal', title: 'Add Event' },
        'edit-event': { modal: 'event-modal', title: 'Edit Event' },
        'add-founder': { modal: 'founder-modal', title: 'Add Founder' },
        'edit-founder': { modal: 'founder-modal', title: 'Edit Founder' },
        'add-face': { modal: 'face-modal', title: 'Add Face' },
        'edit-face': { modal: 'face-modal', title: 'Edit Face' },
        'add-career': { modal: 'career-modal', title: 'Add Career' },
        'edit-career': { modal: 'career-modal', title: 'Edit Career' },
        'add-announcement': { modal: 'announcement-modal', title: 'Add Announcement' },
        'edit-announcement': { modal: 'announcement-modal', title: 'Edit Announcement' },
        'add-journal': { modal: 'journal-modal', title: 'Add Journal' },
        'edit-journal': { modal: 'journal-modal', title: 'Edit Journal' }
    };
    
    const config = modalMap[type];
    const modal = document.getElementById(config.modal);
    modal.classList.remove('hidden');
    
    if (config.modal === 'influencer-modal') {
        document.getElementById('modal-title').textContent = config.title;
    } else if (config.modal === 'event-modal') {
        document.getElementById('event-modal-title').textContent = config.title;
    } else if (config.modal === 'founder-modal') {
        document.getElementById('founder-modal-title').textContent = config.title;
    } else if (config.modal === 'face-modal') {
        document.getElementById('face-modal-title').textContent = config.title;
    } else if (config.modal === 'career-modal') {
        document.getElementById('career-modal-title').textContent = config.title;
    } else if (config.modal === 'announcement-modal') {
        document.getElementById('announcement-modal-title').textContent = config.title;
    } else if (config.modal === 'journal-modal') {
        document.getElementById('journal-modal-title').textContent = config.title;
    }
}

function closeModal() {
    document.querySelectorAll('[id$="-modal"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('form').forEach(form => form.reset());
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function handleImageUpload(inputId, callback) {
    const input = document.getElementById(inputId);
    if (input && input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => callback(e.target.result);
        reader.readAsDataURL(input.files[0]);
    }
}

function editInfluencer(id) {
    const inf = influencers.find(i => i.id === id);
    if (!inf) return;
    
    document.getElementById('influencer-id').value = inf.id;
    document.getElementById('influencer-name').value = inf.name;
    document.getElementById('influencer-username').value = inf.username;
    document.getElementById('influencer-followers').value = inf.followers;
    document.getElementById('influencer-bio').value = inf.bio;
    document.getElementById('influencer-link').value = inf.link || '';
    
    document.getElementById('preview-name').textContent = inf.name;
    document.getElementById('preview-followers').textContent = inf.followers;
    document.getElementById('preview-bio').textContent = inf.bio;
    document.getElementById('preview-image').src = inf.image;
    
    openModal('edit-influencer');
}

function deleteInfluencer(id) {
    if (confirm('Are you sure you want to delete this influencer?')) {
        influencers = influencers.filter(i => i.id !== id);
        saveInfluencers();
        renderInfluencers();
        showToast('Influencer deleted successfully!', 'success');
    }
}

function editEvent(id) {
    const evt = events.find(e => e.id === id);
    if (!evt) return;
    
    document.getElementById('event-id').value = evt.id;
    document.getElementById('event-name').value = evt.name;
    document.getElementById('event-date').value = evt.date;
    document.getElementById('event-description').value = evt.description;
    document.getElementById('event-location').value = evt.location;
    document.getElementById('event-registration-link').value = evt.registrationLink || '';
    
    openModal('edit-event');
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(e => e.id !== id);
        saveEvents();
        renderEvents();
        showToast('Event deleted successfully!', 'success');
    }
}

function editAnnouncement(id) {
    const ann = announcements.find(a => a.id === id);
    if (!ann) return;
    
    document.getElementById('announcement-id').value = ann.id;
    document.getElementById('announcement-text').value = ann.text;
    
    openModal('edit-announcement');
}

function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        announcements = announcements.filter(a => a.id !== id);
        saveAnnouncements();
        renderAnnouncements();
        showToast('Announcement deleted successfully!', 'success');
    }
}

function editJournal(id) {
    const jrn = journals.find(j => j.id === id);
    if (!jrn) return;
    
    document.getElementById('journal-id').value = jrn.id;
    document.getElementById('journal-title').value = jrn.title;
    document.getElementById('journal-read-time').value = jrn.readTime || '';
    document.getElementById('journal-link').value = jrn.link || '';
    document.getElementById('journal-description').value = jrn.description || '';
    
    openModal('edit-journal');
}

function deleteJournal(id) {
    if (confirm('Are you sure you want to delete this journal?')) {
        journals = journals.filter(j => j.id !== id);
        saveJournals();
        renderJournals();
        showToast('Journal deleted successfully!', 'success');
    }
}

function editFounder(id) {
    const fdr = founders.find(f => f.id === id);
    if (!fdr) return;
    
    document.getElementById('founder-id').value = fdr.id;
    document.getElementById('founder-name').value = fdr.name;
    document.getElementById('founder-title').value = fdr.title;
    
    openModal('edit-founder');
}

function deleteFounder(id) {
    if (confirm('Are you sure you want to delete this founder?')) {
        founders = founders.filter(f => f.id !== id);
        saveFounders();
        renderFounders();
        showToast('Founder deleted successfully!', 'success');
    }
}

function editFace(id) {
    const f = faces.find(x => x.id === id);
    if (!f) return;
    
    document.getElementById('face-id').value = f.id;
    document.getElementById('face-name').value = f.name;
    document.getElementById('face-role').value = f.role;
    
    openModal('edit-face');
}

function deleteFace(id) {
    if (confirm('Are you sure you want to delete this face?')) {
        faces = faces.filter(f => f.id !== id);
        saveFaces();
        renderFaces();
        showToast('Face deleted successfully!', 'success');
    }
}

function editCareer(id) {
    const c = careers.find(x => x.id === id);
    if (!c) return;
    
    document.getElementById('career-id').value = c.id;
    document.getElementById('career-position').value = c.position;
    document.getElementById('career-email').value = c.email;
    
    openModal('edit-career');
}

function deleteCareer(id) {
    if (confirm('Are you sure you want to delete this career?')) {
        careers = careers.filter(c => c.id !== id);
        saveCareers();
        renderCareers();
        showToast('Career deleted successfully!', 'success');
    }
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-6 right-6 z-[60] glass border ${type === 'success' ? 'border-[#D4AF37]' : 'border-red-500'} px-8 py-4 rounded-[30px] flex items-center gap-4 shadow-2xl animate-bounce`;
    toast.innerHTML = `
        <i class="bx ${type === 'success' ? 'bx-check-circle text-[#D4AF37]' : 'bx-x-circle text-red-500'} text-2xl"></i>
        <span class="font-bold">${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function initForms() {
    const influencerForm = document.getElementById('influencer-form');
    if (influencerForm) {
        influencerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('influencer-id').value;
            let newImage = '';
            
            const finalize = () => {
                const data = {
                    id: id || generateId(),
                    name: document.getElementById('influencer-name').value,
                    username: document.getElementById('influencer-username').value,
                    followers: document.getElementById('influencer-followers').value,
                    bio: document.getElementById('influencer-bio').value,
                    link: document.getElementById('influencer-link').value,
                    image: newImage || (id ? influencers.find(i => i.id === id)?.image : ''),
                    platform: 'Instagram'
                };
                
                if (id) {
                    const idx = influencers.findIndex(i => i.id === id);
                    if (idx !== -1) influencers[idx] = data;
                    showToast('Influencer updated successfully!', 'success');
                } else {
                    influencers.push(data);
                    showToast('Influencer saved successfully!', 'success');
                }
                
                saveInfluencers();
                renderInfluencers();
                closeModal();
            };
            
            const imageInput = document.getElementById('influencer-image');
            if (imageInput.files && imageInput.files[0]) {
                handleImageUpload('influencer-image', (img) => {
                    newImage = img;
                    finalize();
                });
            } else {
                finalize();
            }
        });
        
        ['name', 'username', 'followers', 'bio'].forEach(field => {
            const el = document.getElementById(`influencer-${field}`);
            if (el) {
                el.addEventListener('input', () => {
                    const preview = document.getElementById(`preview-${field}`);
                    if (preview) preview.textContent = el.value || (field === 'name' ? 'Your Name' : field === 'followers' ? '0' : 'Your bio will appear here...');
                });
            }
        });
        
        document.getElementById('influencer-image')?.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('preview-image').src = ev.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
    
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('event-id').value;
            let newImage = '';
            
            const finalize = () => {
                const data = {
                    id: id || generateId(),
                    name: document.getElementById('event-name').value,
                    date: document.getElementById('event-date').value,
                    description: document.getElementById('event-description').value,
                    location: document.getElementById('event-location').value,
                    registrationLink: document.getElementById('event-registration-link').value,
                    image: newImage || (id ? events.find(e => e.id === id)?.image : '')
                };
                
                if (id) {
                    const idx = events.findIndex(e => e.id === id);
                    if (idx !== -1) events[idx] = data;
                    showToast('Event updated successfully!', 'success');
                } else {
                    events.push(data);
                    showToast('Event saved successfully!', 'success');
                }
                
                saveEvents();
                renderEvents();
                closeModal();
            };
            
            const imageInput = document.getElementById('event-image');
            if (imageInput.files && imageInput.files[0]) {
                handleImageUpload('event-image', (img) => {
                    newImage = img;
                    finalize();
                });
            } else {
                finalize();
            }
        });
    }
    
    const announcementForm = document.getElementById('announcement-form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('announcement-id').value;
            
            const data = {
                id: id || generateId(),
                text: document.getElementById('announcement-text').value
            };
            
            if (id) {
                const idx = announcements.findIndex(a => a.id === id);
                if (idx !== -1) announcements[idx] = data;
                showToast('Announcement updated successfully!', 'success');
            } else {
                announcements.push(data);
                showToast('Announcement saved successfully!', 'success');
            }
            
            saveAnnouncements();
            renderAnnouncements();
            closeModal();
        });
    }
    
    const journalForm = document.getElementById('journal-form');
    if (journalForm) {
        journalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('journal-id').value;
            let newImage = '';
            
            const finalize = () => {
                const data = {
                    id: id || generateId(),
                    title: document.getElementById('journal-title').value,
                    readTime: document.getElementById('journal-read-time').value,
                    description: document.getElementById('journal-description').value,
                    link: document.getElementById('journal-link').value,
                    image: newImage || (id ? journals.find(j => j.id === id)?.image : '')
                };
                
                if (id) {
                    const idx = journals.findIndex(j => j.id === id);
                    if (idx !== -1) journals[idx] = data;
                    showToast('Journal updated successfully!', 'success');
                } else {
                    journals.push(data);
                    showToast('Journal saved successfully!', 'success');
                }
                
                saveJournals();
                renderJournals();
                closeModal();
            };
            
            const imageInput = document.getElementById('journal-image');
            if (imageInput.files && imageInput.files[0]) {
                handleImageUpload('journal-image', (img) => {
                    newImage = img;
                    finalize();
                });
            } else {
                finalize();
            }
        });
    }
    
    const founderForm = document.getElementById('founder-form');
    if (founderForm) {
        founderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('founder-id').value;
            let newImage = '';
            
            const finalize = () => {
                const data = {
                    id: id || generateId(),
                    name: document.getElementById('founder-name').value,
                    title: document.getElementById('founder-title').value,
                    image: newImage || (id ? founders.find(f => f.id === id)?.image : '')
                };
                
                if (id) {
                    const idx = founders.findIndex(f => f.id === id);
                    if (idx !== -1) founders[idx] = data;
                    showToast('Founder updated successfully!', 'success');
                } else {
                    founders.push(data);
                    showToast('Founder saved successfully!', 'success');
                }
                
                saveFounders();
                renderFounders();
                closeModal();
            };
            
            const imageInput = document.getElementById('founder-image');
            if (imageInput.files && imageInput.files[0]) {
                handleImageUpload('founder-image', (img) => {
                    newImage = img;
                    finalize();
                });
            } else {
                finalize();
            }
        });
    }
    
    const faceForm = document.getElementById('face-form');
    if (faceForm) {
        faceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('face-id').value;
            let newImage = '';
            
            const finalize = () => {
                const data = {
                    id: id || generateId(),
                    name: document.getElementById('face-name').value,
                    role: document.getElementById('face-role').value,
                    image: newImage || (id ? faces.find(f => f.id === id)?.image : '')
                };
                
                if (id) {
                    const idx = faces.findIndex(f => f.id === id);
                    if (idx !== -1) faces[idx] = data;
                    showToast('Face updated successfully!', 'success');
                } else {
                    faces.push(data);
                    showToast('Face saved successfully!', 'success');
                }
                
                saveFaces();
                renderFaces();
                closeModal();
            };
            
            const imageInput = document.getElementById('face-image');
            if (imageInput.files && imageInput.files[0]) {
                handleImageUpload('face-image', (img) => {
                    newImage = img;
                    finalize();
                });
            } else {
                finalize();
            }
        });
    }
    
    const careerForm = document.getElementById('career-form');
    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('career-id').value;
            
            const data = {
                id: id || generateId(),
                position: document.getElementById('career-position').value,
                email: document.getElementById('career-email').value
            };
            
            if (id) {
                const idx = careers.findIndex(c => c.id === id);
                if (idx !== -1) careers[idx] = data;
                showToast('Career updated successfully!', 'success');
            } else {
                careers.push(data);
                showToast('Career saved successfully!', 'success');
            }
            
            saveCareers();
            renderCareers();
            closeModal();
        });
    }
}

function initAdminPanel() {
    const hasReset = localStorage.getItem('punktuate_admin_reset_done');
    if (!hasReset) {
        const defaultInfluencers = getDefaultInfluencers();
        localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(defaultInfluencers));
        localStorage.setItem('punktuate_admin_reset_done', 'true');
    }
    
    loadData();
    initForms();
    renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
    if (checkAuth()) {
        initAdminPanel();
    }
});

