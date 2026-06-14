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
{title:'ROV Pilot Technician — United Kingdom',company:'Oceaneering',country:'United Kingdom',type:'Full-time',experience:'Junior',mode:'On-site',description:'Assist or pilot the ROV, evaluate environmental conditions and hazards, dock/undock from TMS, and navigate the ROV during offshore operations.',tags:['ROV Pilot','Offshore','Technician'],link:'https://careers.oceaneering.com/global/en/job/OCINGLOBAL31007/ROV-Pilot-Technician-United-Kingdom'},
{title:'ROV Technician — Canada',company:'Oceaneering',country:'Canada',type:'Full-time',experience:'Junior',mode:'On-site',description:'Co-pilot or pilot the ROV, work with acoustic/sonar navigation, and support offshore ROV maintenance and operations.',tags:['ROV Technician','Canada','Operations'],link:'https://careers.oceaneering.com/global/en/job/OCINGLOBAL31248/ROV-Technician'},
{title:'ROV Supervisor — United Kingdom',company:'Oceaneering',country:'United Kingdom',type:'Full-time',experience:'Senior',mode:'On-site',description:'Supervise ROV operations, train operators, and manage workover control systems, tensioning systems, and reel systems.',tags:['ROV Supervisor','Training','Offshore'],link:'https://careers.oceaneering.com/global/en/job/OCINGLOBAL30952/ROV-Supervisor-%C2%A0-United-Kingdom'},
{title:'Software Applications Engineer — Underwater Robotics',company:'Saab Seaeye',country:'United Kingdom',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'Design and implement application and software solutions for underwater robotics applications within Saab Seaeye.',tags:['Software','Underwater Robotics','Saab Seaeye'],link:'https://www.saab.com/career/job-opportunities/software-applications-engineer'},
{title:'Hydraulic Systems Engineer — Subsea / ROV',company:'Saab Seaeye',country:'United Kingdom',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'Work with subsea hydraulic systems, HPU units, valve packs, manipulators, and ROV tooling for underwater robotics products.',tags:['Hydraulics','ROV Tooling','Subsea'],link:'https://www.saab.com/career/job-opportunities/hydraulic-systems-engineer'},
{title:'Senior Production Process Engineer — ROV Subsystems',company:'Saab Seaeye',country:'United Kingdom',type:'Full-time',experience:'Senior',mode:'On-site',description:'Support assembly and testing processes for remotely operated vehicle subsystems and production processes.',tags:['Production','ROV Subsystems','Process'],link:'https://www.saab.com/career/job-opportunities/senior-production-process-engineer'},
{title:'ROV/AUV Robotics Engineer',company:'Oceyon',country:'United States',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'A hands-on role combining underwater robotics piloting, engineering and assembly, technical project management, and operational readiness.',tags:['ROV','AUV','Robotics Engineer'],link:'https://www.linkedin.com/jobs/view/rov-auv-robotics-engineer-at-oceyon-4419911424'},
{title:'Senior Underwater Vehicle Design Engineer — UUV/ROV',company:'Syos Aerospace',country:'New Zealand',type:'Full-time',experience:'Senior',mode:'On-site',description:'Contribute to design, prototyping, and testing of AUV/UUV/ROV platforms as part of a subsea vehicles team.',tags:['UUV','ROV','Design Engineer'],link:'https://nz.linkedin.com/jobs/view/senior-underwater-vehicle-design-engineer-uuv-rov-at-syos-aerospace-4318173614'},
{title:'Mechanical Design Engineer — Underwater Robotics',company:'AliciaBots',country:'Singapore',type:'Full-time',experience:'Mid-level',mode:'On-site',description:'Develop mechanical systems for underwater robotic platforms including frames, propulsion systems, pressure housings, and sealing mechanisms.',tags:['Mechanical Design','Underwater Robotics','Propulsion'],link:'https://sg.linkedin.com/jobs/view/mechanical-design-engineer-%E2%80%93-underwater-robotics-at-aliciabots-4384973782'},
{title:'Underwater Robotics Jobs — Live LinkedIn Board',company:'LinkedIn',country:'United States',type:'Full-time',experience:'Junior',mode:'Hybrid',description:'Live LinkedIn board for underwater robotics roles including robotics engineering, mechanical design, autonomy, and ROV/AUV related positions.',tags:['Live Job Board','Underwater Robotics','LinkedIn'],link:'https://www.linkedin.com/jobs/underwater-robotics-jobs'}
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
{title:'Build a Remotely Operated Vehicle at Home',topic:'rov build diy underwater robot beginner',desc:'A direct start-to-finish instructional video for building and wiring a home-built underwater ROV.',url:'https://www.youtube.com/watch?v=Lnr5YlBl550'},
{title:'Underwater ROV — Home Built',topic:'home built rov buoyancy control electronics',desc:'A direct home-built ROV video covering basic buoyancy, control, and electronics concepts.',url:'https://www.youtube.com/watch?v=WE6ODgQAxvU'},
{title:'3D Printed Underwater Thruster Build',topic:'thruster propulsion 3d printed auv rov',desc:'A direct video showing how to assemble an underwater thruster using 3D printing.',url:'https://www.youtube.com/watch?v=J_N0RghoV0Q'},
{title:'How to Set Up an ROV Simulator',topic:'rov simulator pilot training setup',desc:'A direct setup video for an ROV training simulator environment.',url:'https://www.youtube.com/watch?v=Ki1jUXESlOc'},
{title:'ROV Pilot / Technician Career Playlist',topic:'rov pilot technician career offshore',desc:'A direct playlist about ROV pilot and technician career paths.',url:'https://www.youtube.com/playlist?list=PLKky_xSX3HFUre5SZ4BpoiXLtHu79O91n'},
{title:'ROV Simulator Playlist',topic:'rov simulator training subsea pilot',desc:'A direct playlist for ROV simulator and subsea training videos.',url:'https://www.youtube.com/playlist?list=PLsK63VueJ8OJCHd2EJduemplqgEoqopE8'},
{title:'ROV Manipulator Arms Testing',topic:'rov manipulator arm testing underwater robot',desc:'A direct video focused on manipulator arm testing for ROV systems.',url:'https://www.youtube.com/watch?v=X-rXGIGly90'},
{title:'Blueye Vertical Thruster Replacement Tutorial',topic:'blueye thruster replacement underwater drone',desc:'A direct tutorial video for replacing a vertical thruster on a Blueye underwater drone.',url:'https://www.youtube.com/watch?v=JFUl6BOBjLg'},
{title:'Building Your ROV — Thrusters',topic:'rov thrusters build propulsion tutorial',desc:'A direct video about ROV thrusters and propulsion in a build series.',url:'https://www.youtube.com/watch?v=5kF8BKLqOV0'},
{title:'DIY ROV Thruster Performance Test',topic:'diy rov thruster test propulsion',desc:'A direct video testing a DIY ROV thruster and propulsion performance.',url:'https://www.youtube.com/watch?v=uJ4Hz6cmL_4'},
{title:'DIY Water Thruster Test for PVC Aquatic Rovers',topic:'pvc rov water thruster diy test',desc:'A direct DIY underwater thruster test video for PVC aquatic rover projects.',url:'https://www.youtube.com/watch?v=BlHQMUbsZpk'},
{title:'Oceaneering ROV Channel Videos',topic:'oceaneering rov offshore subsea videos',desc:'A direct Oceaneering channel page with ROV and subsea operation videos.',url:'https://www.youtube.com/@oceaneering/videos'}
];
function initVideos(){
 const grid=document.getElementById('videoGrid'); if(!grid) return;
 const input=document.getElementById('videoFilter');
 function render(){
  const kw=input.value.toLowerCase();
  const filtered=videos.filter(v=>!kw||`${v.title} ${v.topic} ${v.desc}`.toLowerCase().includes(kw));
  grid.innerHTML=filtered.map(v=>`<article class="video-card"><div class="video-thumb">▶</div><div><h3>${v.title}</h3><p>${v.desc}</p><a class="btn primary" target="_blank" rel="noopener noreferrer" href="${v.url}">Open Video →</a></div></article>`).join('');
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
