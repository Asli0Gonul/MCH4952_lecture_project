const transition=document.querySelector('.page-transition');
document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const href=link.getAttribute('href');
    if(!href || href.startsWith('http') || link.target==='_blank') return;
    e.preventDefault();
    transition?.classList.add('active');
    setTimeout(()=>{window.location.href=href},280);
  });
});
document.querySelectorAll('.nav-toggle').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.nav-menu')?.classList.toggle('open')));

document.querySelectorAll('.calc-form').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    const calc=form.dataset.calc;
    if(calc==='buoyancy'){
      const density=Number(data.density), volume=Number(data.volume)/1000, mass=Number(data.mass), g=9.81;
      const buoyant=density*g*volume;
      const weight=mass*g;
      const net=buoyant-weight;
      document.getElementById('buoyancyResult').innerHTML=`Buoyant force: <b>${buoyant.toFixed(2)} N</b><br>Vehicle weight: <b>${weight.toFixed(2)} N</b><br>Net buoyancy: <b>${net.toFixed(2)} N</b><br>${net>0?'Vehicle is positively buoyant. Add ballast or reduce volume.':net<0?'Vehicle is negatively buoyant. Add flotation or reduce mass.':'Vehicle is approximately neutrally buoyant.'}`;
    }
    if(calc==='thruster'){
      const drag=Number(data.drag), count=Number(data.count), safety=Number(data.safety);
      const total=drag*safety;
      const each=total/count;
      document.getElementById('thrusterResult').innerHTML=`Required total thrust: <b>${total.toFixed(2)} N</b><br>Required thrust per thruster: <b>${each.toFixed(2)} N</b><br>Approx. per thruster: <b>${(each/9.81).toFixed(2)} kgf</b>`;
    }
    if(calc==='battery'){
      const voltage=Number(data.voltage), capacity=Number(data.capacity), power=Number(data.power), usable=Number(data.usable)/100;
      const wh=voltage*capacity*usable;
      const hours=wh/power;
      document.getElementById('batteryResult').innerHTML=`Usable energy: <b>${wh.toFixed(1)} Wh</b><br>Estimated runtime: <b>${hours.toFixed(2)} hours</b><br>Estimated runtime: <b>${(hours*60).toFixed(0)} minutes</b>`;
    }
    if(calc==='component'){
      const mission=data.mission, depth=Number(data.depth);
      const base={
        inspection:['HD camera','LED lighting','depth sensor','4-thruster frame','stable tether'],
        research:['camera','sampling mount','temperature sensor','modular payload rail','data logger'],
        competition:['lightweight frame','manual control system','simple camera','battery monitor','quick repair access'],
        mapping:['sonar or stereo camera','IMU/depth sensor','stable navigation frame','large battery','data storage']
      };
      const depthNote=depth>50?'Use pressure-rated enclosures and connectors for higher depth.':'Standard shallow-water housings may be acceptable for prototype testing.';
      document.getElementById('componentResult').innerHTML=`Recommended components:<br><b>${base[mission].join(', ')}</b><br><br>${depthNote}`;
    }
  });
});

const jobs=[
{title:'Senior Production Engineer — ROV Systems',company:'Saab Seaeye',country:'United Kingdom',type:'Full-time',experience:'Senior',mode:'On-site',description:'Work on production engineering and systems integration for complex ROV assemblies. Best for candidates with mechanical/electrical systems experience.',tags:['ROV','Systems Integration','Production'],link:'https://www.saab.com/career/job-opportunities/senior-production-engineer-systems-integration'},
{title:'ROV Senior Pilot Technician',company:'Oceaneering',country:'United Kingdom / Europe',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'Operate, maintain, and troubleshoot ROV systems, subsea tooling, IWOCS/RWOCS systems, and related offshore equipment.',tags:['ROV Pilot','Offshore','Maintenance'],link:'https://www.oceaneering.com/lp/advance-your-rov-career-journey-with-oceaneering-in-the-uk-and-europe/'},
{title:'Underwater Robotics Engineer',company:'Indeed Job Board',country:'United States',type:'Full-time',experience:'Junior',mode:'On-site',description:'A live job-board route for robotics engineer roles related to underwater systems, marine autonomy, and undersea engineering.',tags:['Robotics','Underwater','Engineering'],link:'https://www.indeed.com/q-underwater-robotics-engineer-jobs.html'},
{title:'Senior Robotics Software Engineer — Maritime',company:'Indeed / Anduril-style Maritime Roles',country:'United States',type:'Full-time',experience:'Senior',mode:'On-site',description:'Software engineering roles for maritime autonomous systems, perception, autonomy, and sensor integration.',tags:['Software','Maritime','Autonomy'],link:'https://www.indeed.com/q-autonomous-underwater-vehicle-l-california-jobs.html'},
{title:'Marine Robotics Engineer',company:'ZipRecruiter Job Board',country:'United States',type:'Full-time',experience:'Mid-level',mode:'Hybrid',description:'Marine robotics engineering roles covering mechanical, electrical, software, and systems engineering responsibilities.',tags:['Marine Robotics','Systems','Engineering'],link:'https://www.ziprecruiter.com/Jobs/Marine-Robotics-Engineer'},
{title:'ROV Pilot Technician Training / Career Path',company:'ROV Training Resources',country:'Global',type:'Contract',experience:'Student',mode:'On-site',description:'For students and beginners exploring the ROV pilot technician career path and offshore ROV operations.',tags:['Training','ROV Pilot','Career Path'],link:'https://www.youtube.com/watch?v=hdRTyWbIdB4'},
{title:'Subsea Robotics Careers',company:'Oceaneering Careers',country:'Global',type:'Full-time',experience:'Mid-level',mode:'Hybrid',description:'Explore subsea engineering, ROV, robotics, offshore, and technical operations opportunities through Oceaneering careers.',tags:['Subsea','ROV','Careers'],link:'https://www.oceaneering.com/careers/'},
{title:'Saab Underwater Systems Career Opportunities',company:'Saab',country:'Global',type:'Full-time',experience:'Junior',mode:'On-site',description:'Explore Saab career opportunities related to underwater systems, ROV technologies, production engineering, and defense robotics.',tags:['Underwater Systems','ROV','Saab'],link:'https://www.saab.com/career/job-opportunities'}
];
function initJobs(){
 const grid=document.getElementById('jobsResults'); if(!grid) return;
 const country=document.getElementById('jobCountry'); [...new Set(jobs.map(j=>j.country))].sort().forEach(c=>country.insertAdjacentHTML('beforeend',`<option>${c}</option>`));
 ['jobKeyword','jobCountry','jobType','jobExperience','jobMode'].forEach(id=>document.getElementById(id).addEventListener('input',render));
 function render(){
  const kw=document.getElementById('jobKeyword').value.toLowerCase(), c=document.getElementById('jobCountry').value,t=document.getElementById('jobType').value,x=document.getElementById('jobExperience').value,m=document.getElementById('jobMode').value;
  const filtered=jobs.filter(j=>(!kw||`${j.title} ${j.company} ${j.description} ${j.tags.join(' ')}`.toLowerCase().includes(kw))&&(!c||j.country===c)&&(!t||j.type===t)&&(!x||j.experience===x)&&(!m||j.mode===m));
  document.getElementById('jobCount').textContent=`${filtered.length} result(s) found`;
  grid.innerHTML=filtered.map(j=>`<article class="job-card"><h3>${j.title}</h3><p><b>${j.company}</b> · ${j.country} · ${j.type} · ${j.experience} · ${j.mode}</p><p>${j.description}</p><div>${j.tags.map(tag=>`<span class="tag">${tag}</span>`).join('')}</div><a class="btn primary" target="_blank" rel="noopener noreferrer" href="${j.link}">Application Link →</a></article>`).join('');
 }
 render();
}
initJobs();

const videos=[
{title:'Blue Robotics Product Overview: BlueROV2 R3',topic:'rov bluerov2 product overview underwater robotics',desc:'A direct video overview of the BlueROV2 platform and its features.',url:'https://www.youtube.com/watch?v=GY0PfnvzzW4'},
{title:'Make an Arduino ROV',topic:'arduino rov build tutorial underwater vehicle',desc:'A practical DIY ROV build video using Arduino-based control ideas.',url:'https://www.youtube.com/watch?v=wRco4tGXrzw'},
{title:'Building a Remotely Operated Vehicle using PVC Pipe',topic:'rov build pvc pipe diy underwater robot',desc:'A direct build-oriented ROV video for simple vehicle construction.',url:'https://www.youtube.com/watch?v=Z41XVzcre4A'},
{title:'BlueROV2 Build Guide',topic:'bluerov2 build guide assembly underwater robotics',desc:'A direct guide-style video about building a BlueROV-style platform.',url:'https://www.youtube.com/watch?v=yJcbAw-JYN0'},
{title:'NMUC ROV Pilot Technician Training',topic:'rov pilot technician training offshore underwater',desc:'A direct training video about ROV pilot technician skills and operations.',url:'https://www.youtube.com/watch?v=hdRTyWbIdB4'},
{title:'ROV Pilots: The Underwater Job',topic:'rov pilot career underwater job offshore',desc:'A direct career-focused video about the ROV pilot profession.',url:'https://www.youtube.com/watch?v=rDlWiD_apS8'},
{title:'Introduction to SeaPerch',topic:'seaperch rov student underwater robotics',desc:'A beginner-friendly ROV education video for students.',url:'https://www.youtube.com/watch?v=zyP_EpKNMJQ'},
{title:'Station Keeping for ROV Operations',topic:'rov station keeping dvl underwater operation',desc:'A direct video about station keeping and ROV positioning support.',url:'https://www.youtube.com/watch?v=luUU9lve43k'},
{title:'PIVOT Basic Movement',topic:'rov basic movement navigation pilot training',desc:'A direct ROV movement and piloting basics video.',url:'https://www.youtube.com/watch?v=FF34GnfxCs4'},
{title:'Work Class ROV Simulator and Manipulator Training',topic:'work class rov simulator manipulator training',desc:'A direct video showing simulator and manipulator training concepts.',url:'https://www.youtube.com/watch?v=RFfrm7WnjyE'},
{title:'UUV Simulation Software Systems',topic:'uuv simulation software underwater robotics training',desc:'A direct video related to underwater robotics simulation and training.',url:'https://www.youtube.com/watch?v=N6dZSeT3Stk'},
{title:'Build an ESP32 RC Submarine with FPV Camera',topic:'esp32 submarine fpv camera underwater build',desc:'A direct DIY underwater vehicle video with FPV camera ideas.',url:'https://www.youtube.com/watch?v=d-2uSKn9rYs'}
];
function initVideos(){
 const grid=document.getElementById('videoGrid'); if(!grid) return;
 const input=document.getElementById('videoFilter');
 function render(){
  const kw=input.value.toLowerCase();
  const filtered=videos.filter(v=>!kw||`${v.title} ${v.topic} ${v.desc}`.toLowerCase().includes(kw));
  grid.innerHTML=filtered.map(v=>`<article class="video-card"><div class="video-thumb">▶</div><div><h3>${v.title}</h3><p>${v.desc}</p><a class="btn primary" target="_blank" rel="noopener noreferrer" href="${v.url}">Watch Videos →</a></div></article>`).join('');
 }
 input.addEventListener('input',render); render();
}
initVideos();

const applicationForm=document.getElementById('applicationForm');
if(applicationForm){applicationForm.addEventListener('submit',e=>{e.preventDefault();document.getElementById('applicationMessage').textContent='Application received. Thank you for your interest!';applicationForm.reset();});}


// Newsletter subscribe demo.
// GitHub Pages is static, so it cannot send automated email by itself.
// This opens a ready-to-send welcome email draft to the entered address.
document.querySelectorAll('.subscribe-form').forEach(form=>{
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    const msg = form.parentElement.querySelector('.subscribe-message');
    const subject = 'Welcome to Deep Dive Robotics';
    const body = `Welcome to Deep Dive Robotics!\n\nAre you ready to dive into the depths of underwater robotics with us? If so, stay tuned for the blog posts, platform updates, ROV learning resources, and engineering news we will send every week.\n\nTogether, we will explore the future of underwater robotics one dive at a time.\n\nDeepDive Technologies`;
    if(msg) msg.textContent = 'Opening a ready-to-send welcome email draft...';
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
