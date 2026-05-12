/**
 * js/data.js
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for all default data and localStorage
 * keys. Shared by both the public site (index.js modules) and
 * the admin panel (admin.js).
 * ─────────────────────────────────────────────────────────────
 */

/* --- localStorage Keys --- */
const STORAGE_KEYS = {
    INFLUENCERS:   'punktuate_influencers',
    EVENTS:        'punktuate_events',
    FOUNDERS:      'punktuate_founders',
    FACES:         'punktuate_faces',
    CAREERS:       'punktuate_careers',
    ANNOUNCEMENTS: 'punktuate_announcements',
    JOURNALS:      'punktuate_journals',
    SESSION:       'punktuate_admin_session',
    RESET_DONE:    'punktuate_admin_reset_done'
};

/* --- Default Data --- */
function getDefaultEvents() {
    return [
        {
            id: 'apurva',
            name: 'The Phoolish Concert',
            date: '13th June',
            location: 'Mumbai',
            description: 'Live Performance',
            image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=1200',
            pageId: 'event-apurva'
        },
        {
            id: 'creators',
            name: 'Creators Interval',
            date: 'TBA',
            location: 'TBA',
            description: 'Brunch & Community',
            image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb11c7?auto=format&fit=crop&q=80&w=1200',
            pageId: 'event-creators'
        }
    ];
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
            title: "Creators Don\u2019t Miss Deadlines. Systems Do.",
            readTime: '4 min read',
            description: '(Building reliability at scale)',
            link: 'systems-not-creators.html',
            image: ''
        },
        {
            id: '3',
            title: 'Virality is Luck. Consistency is Strategy.',
            readTime: '3 min read',
            description: '(Why brands should stop chasing trends)',
            link: 'consistency-over-virality.html',
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

/* --- Founder Bio Data (for modals on public site) --- */
const founderData = {
    arya: {
        name: 'Arya Pawar',
        title: 'Co-Founder, Punktuate',
        image: 'aryapic.png',
        bio: `
            <ul class="space-y-8 text-white/70 text-lg leading-relaxed">
                <li>
                    <strong class="text-white block text-xl mb-2">• Founder, Westelle & Co.</strong>
                    Leading an event and brand collaboration venture, creating experiences backed by strong execution and creative strategy
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Charter President, Rotaract Club of Thane Royales</strong>
                    Built the club from the ground up, leading impactful initiatives and fostering a strong culture of leadership and service (Non profit organisation)
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Charter President, Rotaract Club of Hiranandani Legends</strong>
                    Played a key role in establishing the club, contributing to its vision, growth, and early-stage initiatives (Non profit organisation)
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Brand Collaborations & Campaigns</strong>
                    Worked with brands like Timbuckdo, HyugaLife, Swiggy, and Molten, executing campaigns and partnerships end-to-end
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Community Impact & Service</strong>
                    Organised multiple community service events, engaging and connecting with 60+ children through meaningful initiatives
                </li>
                <li>
                    <strong class="text-white block text-xl mb-2">• Execution-Driven & Systems Focused</strong>
                    Building reliable systems across events and influencer marketing to ensure consistency, clarity, and scalable impact
                </li>
            </ul>
        `
    },
    avanti: {
        name: 'Avanti Thakur',
        title: 'Co-Founder, Punktuate',
        image: '_ASH7503.jpeg',
        bio: `
            <p class="text-white/70 text-xl italic text-center py-20">Details will be updated soon.</p>
        `
    }
};

/* --- Portfolio / Case Study Data --- */
const portfolioData = {
    social: {
        title: 'Techpaathshala',
        subtitle: 'Scaling digital education through high-impact social strategy.',
        content: `
            <div class="space-y-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="portfolio-graphic group" onclick="animateBars()">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase text-sm tracking-widest">Growth Metrics</h4>
                        <div class="space-y-6">
                            <div>
                                <div class="flex justify-between text-xs mb-1 uppercase text-white/40 font-bold"><span>Reach Growth</span><span>+450%</span></div>
                                <div class="interactive-bar"><div class="bar-fill" style="width: 92%"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1 uppercase text-white/40 font-bold"><span>Engagement</span><span>10x</span></div>
                                <div class="interactive-bar"><div class="bar-fill" style="width: 85%"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1 uppercase text-white/40 font-bold"><span>Conversions</span><span>+120%</span></div>
                                <div class="interactive-bar"><div class="bar-fill" style="width: 78%"></div></div>
                            </div>
                        </div>
                        <p class="text-[10px] text-white/20 mt-4 uppercase font-bold italic">Click card to re-animate</p>
                    </div>
                    <div class="glass p-8 rounded-[30px] border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Key Results</h4>
                        <ul class="space-y-3 text-white/80">
                            <li class="flex items-center gap-2"><i class="bx bx-trending-up text-[#D4AF37]"></i> 5M+ reach across Meta</li>
                            <li class="flex items-center gap-2"><i class="bx bx-user-plus text-[#D4AF37]"></i> 500+ followers growth</li>
                            <li class="flex items-center gap-2"><i class="bx bx-play-circle text-[#D4AF37]"></i> 1 trending reel</li>
                        </ul>
                    </div>
                </div>
                <div class="glass p-8 rounded-[30px] border border-white/10">
                    <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Scope of Work</h4>
                    <ul class="grid md:grid-cols-2 gap-4 text-white/40">
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Platform-specific strategy</li>
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Copywriting & Scripts</li>
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Content Calendars</li>
                        <li class="flex items-center gap-2 hover:text-white transition-all cursor-default"><i class="bx bx-chevron-right text-[#D4AF37]"></i> Culture-led Storytelling</li>
                    </ul>
                </div>
            </div>
        `
    },
    ugc: {
        title: 'Swiggy & Molten',
        subtitle: 'UGC-based campaigns and creator coordination.',
        content: `
            <div class="space-y-8">
                <div class="portfolio-graphic text-center group">
                    <h4 class="text-[#D4AF37] font-bold mb-8 uppercase text-sm tracking-widest">Creator Pipeline</h4>
                    <div class="flex justify-center items-center gap-4">
                        <div class="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-all"><i class="bx bx-user text-2xl"></i></div>
                        <div class="w-12 h-[2px] bg-white/10"></div>
                        <div class="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/50 group-hover:scale-110 transition-all"><i class="bx bx-movie text-2xl text-[#D4AF37]"></i></div>
                        <div class="w-12 h-[2px] bg-white/10"></div>
                        <div class="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-all"><i class="bx bx-cart text-2xl"></i></div>
                    </div>
                    <div class="flex justify-between mt-4 px-4 text-[10px] uppercase font-bold text-white/20">
                        <span>Briefing</span><span>Production</span><span>Conversion</span>
                    </div>
                </div>
                <div class="glass p-8 rounded-[30px] border border-white/10">
                    <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Campaign Impact</h4>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h5 class="text-white font-bold italic">Strategy</h5>
                            <ul class="space-y-2 text-white/40 text-sm">
                                <li>• Supported UGC-based campaigns</li>
                                <li>• Coordinated with creators & influencers</li>
                                <li>• Assisted in improving visibility</li>
                            </ul>
                        </div>
                        <div class="space-y-4">
                            <h5 class="text-white font-bold italic">Brands</h5>
                            <div class="flex flex-wrap gap-4">
                                <span class="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#000B3D] transition-all cursor-pointer">Swiggy</span>
                                <span class="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#000B3D] transition-all cursor-pointer">Molten</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    fashion: {
        title: 'Fashion Dekho',
        subtitle: 'Lifestyle content creation and visual storytelling.',
        content: `
            <div class="space-y-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="portfolio-graphic group overflow-hidden">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase text-sm tracking-widest">Brand Aesthetic</h4>
                        <div class="flex gap-2">
                            <div class="flex-1 aspect-[3/4] glass rounded-lg group-hover:scale-105 transition-all"></div>
                            <div class="flex-1 aspect-[3/4] bg-[#D4AF37]/10 rounded-lg group-hover:scale-95 transition-all border border-[#D4AF37]/30"></div>
                            <div class="flex-1 aspect-[3/4] glass rounded-lg group-hover:scale-105 transition-all"></div>
                        </div>
                        <p class="text-[10px] text-white/20 mt-4 uppercase font-bold italic">Curated Visual Language</p>
                    </div>
                    <div class="glass p-8 rounded-[30px] border border-white/10">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Visual Tone</h4>
                        <ul class="space-y-4 text-white/60">
                            <li class="flex items-start gap-3 hover:translate-x-2 transition-all cursor-default"><i class="bx bx-check-circle text-[#D4AF37] mt-1"></i><span><strong>Content Creation:</strong> Production tailored for lifestyle audiences.</span></li>
                            <li class="flex items-start gap-3 hover:translate-x-2 transition-all cursor-default"><i class="bx bx-check-circle text-[#D4AF37] mt-1"></i><span><strong>Brand Integrity:</strong> Maintained tone & visuals across digital.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    page_mgmt: {
        title: 'Herwa Miss & Mrs India',
        subtitle: 'Page management and high-profile brand coordination.',
        content: `
            <div class="space-y-8">
                <div class="portfolio-graphic group flex items-center justify-between">
                    <div class="space-y-2">
                        <h4 class="text-3xl font-black text-white/10 group-hover:text-[#D4AF37] transition-all leading-none">HERWA</h4>
                        <p class="text-[10px] uppercase tracking-widest text-white/20 font-bold italic">National Pageant</p>
                    </div>
                    <div class="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000">
                        <i class="bx bx-crown text-3xl text-[#D4AF37]"></i>
                    </div>
                </div>
                <div class="glass p-8 rounded-[30px] border border-white/10">
                    <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">The Impact</h4>
                    <ul class="grid md:grid-cols-2 gap-4 text-white/40">
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Social visibility</li>
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Content support</li>
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Event coordination</li>
                        <li class="flex items-center gap-2"><i class="bx bx-check text-[#D4AF37]"></i> Cycle execution</li>
                    </ul>
                </div>
            </div>
        `
    },
    consulting: {
        title: 'Consulting & Audits',
        subtitle: 'Strategic clarity for brands that need direction.',
        content: `
            <div class="space-y-8">
                <div class="portfolio-graphic group text-center py-12">
                    <i class="bx bx-search-alt text-6xl text-[#D4AF37] mb-6 opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all"></i>
                    <h4 class="text-xl font-bold uppercase tracking-widest text-white/60">Brand Diagnosis</h4>
                    <p class="text-xs text-white/20 mt-2 font-bold italic">"We see what others miss."</p>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="glass p-8 rounded-[30px] border border-white/10 hover:border-[#D4AF37]/50 transition-all">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">Core Services</h4>
                        <ul class="space-y-3 text-white/40">
                            <li class="hover:text-white transition-all">• Brand & social audits</li>
                            <li class="hover:text-white transition-all">• 1:1 strategy sessions</li>
                            <li class="hover:text-white transition-all">• Fix-my-content</li>
                            <li class="hover:text-white transition-all">• Team workshops</li>
                        </ul>
                    </div>
                    <div class="glass p-8 rounded-[30px] border border-[#D4AF37]/20">
                        <h4 class="text-[#D4AF37] font-bold mb-4 uppercase">The Goal</h4>
                        <p class="text-white/40">To move brands away from random acts of marketing and toward a cohesive, high-performance strategy.</p>
                    </div>
                </div>
            </div>
        `
    }
};
