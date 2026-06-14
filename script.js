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
{title:'ROV Systems Engineering Intern',company:'Blue Ocean Robotics',country:'Norway',type:'Internship',experience:'Student',mode:'On-site',description:'Support testing and documentation of observation-class ROV systems for marine research.',tags:['ROV','Testing','Marine'],link:'https://www.linkedin.com/jobs/search/?keywords=ROV%20Systems%20Engineering%20Intern&location=Norway'},
{title:'Marine Robotics Software Engineer',company:'AquaMotion Labs',country:'United Kingdom',type:'Full-time',experience:'Junior',mode:'Hybrid',description:'Develop autonomy modules for underwater inspection robots using ROS and sensor fusion.',tags:['ROS','AUV','Autonomy'],link:'https://www.linkedin.com/jobs/search/?keywords=Marine%20Robotics%20Software%20Engineer&location=United%20Kingdom'},
{title:'Embedded Systems Engineer — Underwater Vehicles',company:'Subsea Dynamics',country:'Germany',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'Design embedded control boards and power interfaces for subsea robotics platforms.',tags:['Embedded','Power','Control'],link:'https://www.linkedin.com/jobs/search/?keywords=Embedded%20Systems%20Engineer%20Underwater%20Vehicles&location=Germany'},
{title:'ROV Pilot Technician',company:'Offshore Survey Group',country:'United States',type:'Contract',experience:'Junior',mode:'On-site',description:'Operate and maintain work-class ROV systems for offshore inspection missions.',tags:['ROV Pilot','Offshore','Inspection'],link:'https://www.indeed.com/jobs?q=ROV+Pilot+Technician&l=United+States'},
{title:'Computer Vision Intern — Marine Perception',company:'DeepVision Robotics',country:'Türkiye',type:'Internship',experience:'Student',mode:'Hybrid',description:'Work on underwater image processing, object detection, and dataset annotation.',tags:['Computer Vision','YOLO','Perception'],link:'https://www.linkedin.com/jobs/search/?keywords=Computer%20Vision%20Intern%20Marine%20Perception&location=Türkiye'},
{title:'Controls Engineer — ROV Manipulator',company:'Tethys Robotics',country:'France',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'Develop control algorithms for underwater robotic arms and manipulation tasks.',tags:['Control','Manipulator','ROV'],link:'https://www.linkedin.com/jobs/search/?keywords=Controls%20Engineer%20ROV%20Manipulator&location=France'}
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
{title:'What is an ROV?',topic:'rov basics underwater robotics',desc:'Introductory video search about ROV types, structure, and usage.',query:'what is an ROV underwater robotics'},
{title:'ROV Buoyancy Explained',topic:'buoyancy stability rov',desc:'Learn buoyancy, ballast, center of gravity, and stability concepts.',query:'ROV buoyancy stability explained'},
{title:'ROV Thrusters and Propulsion',topic:'thruster propulsion rov',desc:'Understand thruster placement, thrust direction, and control mixing.',query:'ROV thruster propulsion explained'},
{title:'Underwater Robotics Control',topic:'control software rov auv',desc:'Control systems and software concepts for underwater vehicles.',query:'underwater robotics control ROV AUV'},
{title:'ROV Build Tutorial',topic:'build diy rov',desc:'Practical design and build videos for student ROV platforms.',query:'student ROV build tutorial'},
{title:'Marine Perception & Cameras',topic:'camera computer vision underwater',desc:'Video resources about underwater vision, cameras, and perception.',query:'underwater robotics computer vision camera'}
];
function initVideos(){
 const grid=document.getElementById('videoGrid'); if(!grid) return;
 const input=document.getElementById('videoFilter');
 function render(){
  const kw=input.value.toLowerCase();
  const filtered=videos.filter(v=>!kw||`${v.title} ${v.topic} ${v.desc}`.toLowerCase().includes(kw));
  grid.innerHTML=filtered.map(v=>`<article class="video-card"><div class="video-thumb">▶</div><div><h3>${v.title}</h3><p>${v.desc}</p><a class="btn primary" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query=${encodeURIComponent(v.query)}">Watch Videos →</a></div></article>`).join('');
 }
 input.addEventListener('input',render); render();
}
initVideos();

const applicationForm=document.getElementById('applicationForm');
if(applicationForm){applicationForm.addEventListener('submit',e=>{e.preventDefault();document.getElementById('applicationMessage').textContent='Application received. Thank you for your interest!';applicationForm.reset();});}
