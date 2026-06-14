const screens=[...document.querySelectorAll('.screen')];
const navButtons=[...document.querySelectorAll('[data-go]')];
function go(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.go===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
navButtons.forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));

document.getElementById('calcBuoyancy')?.addEventListener('click',()=>{
  const density=+bDensity.value, volume=+bVolume.value/1000, mass=+bMass.value, g=9.81;
  const buoyant=density*g*volume, weight=mass*g, net=buoyant-weight;
  buoyancyResult.innerHTML=`Buoyant force: <b>${buoyant.toFixed(2)} N</b><br>Weight: <b>${weight.toFixed(2)} N</b><br>Net buoyancy: <b>${net.toFixed(2)} N</b><br>${net>0?'Positive buoyancy: add ballast or reduce volume.':net<0?'Negative buoyancy: add flotation or reduce mass.':'Almost neutral buoyancy.'}`;
});
document.getElementById('calcThruster')?.addEventListener('click',()=>{
  const total=+tDrag.value * +tSafety.value, each=total/+tCount.value;
  thrusterResult.innerHTML=`Total required thrust: <b>${total.toFixed(2)} N</b><br>Per thruster: <b>${each.toFixed(2)} N</b><br>Approx: <b>${(each/9.81).toFixed(2)} kgf</b>`;
});
document.getElementById('calcBattery')?.addEventListener('click',()=>{
  const wh=+batVoltage.value * +batCapacity.value * (+batUsable.value/100), hours=wh/+batPower.value;
  batteryResult.innerHTML=`Usable energy: <b>${wh.toFixed(1)} Wh</b><br>Runtime: <b>${hours.toFixed(2)} hours</b><br>Runtime: <b>${(hours*60).toFixed(0)} minutes</b>`;
});
document.getElementById('calcComponent')?.addEventListener('click',()=>{
  const sets={inspection:['HD camera','LED lighting','depth sensor','stable tether'],research:['sampling mount','temperature sensor','data logger','payload rail'],competition:['light frame','manual control','camera','battery monitor'],mapping:['sonar/stereo camera','IMU','larger battery','data storage']};
  const note=+missionDepth.value>50?'Use pressure-rated enclosures and connectors.':'Good for shallow-water prototype planning.';
  componentResult.innerHTML=`Recommended: <b>${sets[missionType.value].join(', ')}</b><br>${note}`;
});

const videos=[
{title:'Build a Remotely Operated Vehicle at Home',topic:'rov build diy underwater robot beginner',url:'https://www.youtube.com/watch?v=Lnr5YlBl550'},
{title:'Underwater ROV — Home Built',topic:'home built rov buoyancy control electronics',url:'https://www.youtube.com/watch?v=WE6ODgQAxvU'},
{title:'3D Printed Underwater Thruster Build',topic:'thruster propulsion 3d printed auv rov',url:'https://www.youtube.com/watch?v=J_N0RghoV0Q'},
{title:'How to Set Up an ROV Simulator',topic:'rov simulator pilot training setup',url:'https://www.youtube.com/watch?v=Ki1jUXESlOc'},
{title:'ROV Pilot / Technician Career Playlist',topic:'rov pilot technician career offshore',url:'https://www.youtube.com/playlist?list=PLKky_xSX3HFUre5SZ4BpoiXLtHu79O91n'},
{title:'ROV Manipulator Arms Testing',topic:'rov manipulator arm testing underwater robot',url:'https://www.youtube.com/watch?v=X-rXGIGly90'}
];
const jobs=[
{title:'ROV Pilot Technician — United Kingdom',company:'Oceaneering',topic:'rov pilot offshore technician',url:'https://careers.oceaneering.com/global/en/job/OCINGLOBAL31007/ROV-Pilot-Technician-United-Kingdom'},
{title:'ROV Technician — Canada',company:'Oceaneering',topic:'rov technician canada offshore',url:'https://careers.oceaneering.com/global/en/job/OCINGLOBAL31248/ROV-Technician'},
{title:'ROV Supervisor — United Kingdom',company:'Oceaneering',topic:'rov supervisor offshore senior',url:'https://careers.oceaneering.com/global/en/job/OCINGLOBAL30952/ROV-Supervisor-%C2%A0-United-Kingdom'},
{title:'Software Applications Engineer — Underwater Robotics',company:'Saab Seaeye',topic:'software underwater robotics saab seaeye',url:'https://www.saab.com/career/job-opportunities/software-applications-engineer'},
{title:'Hydraulic Systems Engineer — Subsea / ROV',company:'Saab Seaeye',topic:'hydraulic subsea rov tooling',url:'https://www.saab.com/career/job-opportunities/hydraulic-systems-engineer'},
{title:'ROV/AUV Robotics Engineer',company:'Oceyon',topic:'rov auv robotics engineer',url:'https://www.linkedin.com/jobs/view/rov-auv-robotics-engineer-at-oceyon-4419911424'}
];
function renderList(source, el, search=''){
  const q=search.toLowerCase();
  el.innerHTML=source.filter(x=>!q||`${x.title} ${x.company||''} ${x.topic}`.toLowerCase().includes(q)).map(x=>`<article class="item-card"><h2>${x.title}</h2>${x.company?`<p><b>${x.company}</b></p>`:''}<div>${x.topic.split(' ').slice(0,4).map(t=>`<span class="tag">${t}</span>`).join('')}</div><a class="open-link" target="_blank" rel="noopener noreferrer" href="${x.url}">Open →</a></article>`).join('');
}
if(document.getElementById('videoList')){renderList(videos,videoList); videoSearch.addEventListener('input',()=>renderList(videos,videoList,videoSearch.value));}
if(document.getElementById('jobList')){renderList(jobs,jobList); jobSearch.addEventListener('input',()=>renderList(jobs,jobList,jobSearch.value));}

document.getElementById('applyBtn')?.addEventListener('click',()=>{applyStatus.textContent='Application received. Thank you for your interest!';});
document.getElementById('subscribeBtn')?.addEventListener('click',()=>{
  const email=subscribeEmail.value.trim();
  if(!email){subscribeStatus.textContent='Please enter your email.';return;}
  subscribeStatus.textContent='Opening welcome email draft...';
  const subject='Welcome to Deep Dive Robotics';
  const body='Welcome to Deep Dive Robotics!\n\nAre you ready to dive into the depths of underwater robotics with us? If so, stay tuned for the blog posts, platform updates, ROV learning resources, and engineering news we will send every week.\n\nTogether, we will explore the future of underwater robotics one dive at a time.\n\nDeepDive Technologies';
  window.location.href=`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
