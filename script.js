// Navigation
document.querySelectorAll(".nav-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("open");
    button.setAttribute("aria-expanded", navLinks.classList.contains("open"));
  });
});

// -------------------- Demo Job Search --------------------
// This is a static demo dataset for GitHub Pages.
// Later, a backend or serverless deployment can call a real job API such as Adzuna or SerpAPI.
// Never expose private API keys directly in frontend JavaScript.

const jobs = [
  {title:"ROV Systems Engineering Intern", company:"Blue Ocean Robotics", country:"Norway", type:"Internship", experience:"Student", mode:"On-site", description:"Support testing and documentation of observation-class ROV systems for marine research.", tags:["ROV","Testing","Marine"], link:"#"},
  {title:"Marine Robotics Software Engineer", company:"AquaMotion Labs", country:"United Kingdom", type:"Full-time", experience:"Junior", mode:"Hybrid", description:"Develop autonomy modules for underwater inspection robots using ROS and sensor fusion.", tags:["ROS","AUV","Autonomy"], link:"#"},
  {title:"Embedded Systems Engineer — Underwater Vehicles", company:"Subsea Dynamics", country:"Germany", type:"Full-time", experience:"Mid-level", mode:"On-site", description:"Design embedded control boards and power interfaces for subsea robotics platforms.", tags:["Embedded","Power","Control"], link:"#"},
  {title:"ROV Pilot Technician", company:"Offshore Survey Group", country:"United States", type:"Contract", experience:"Junior", mode:"On-site", description:"Operate and maintain work-class ROV systems for offshore inspection missions.", tags:["ROV Pilot","Offshore","Inspection"], link:"#"},
  {title:"Computer Vision Intern — Marine Perception", company:"DeepVision Robotics", country:"Türkiye", type:"Internship", experience:"Student", mode:"Hybrid", description:"Work on underwater image processing, object detection, and dataset annotation.", tags:["Computer Vision","YOLO","Perception"], link:"#"},
  {title:"Robotics Research Assistant", company:"Marine AI Institute", country:"Canada", type:"Part-time", experience:"Student", mode:"Remote", description:"Assist with literature review and simulation experiments for AUV navigation.", tags:["Research","AUV","Navigation"], link:"#"},
  {title:"Senior Subsea Robotics Engineer", company:"OceanWorks Advanced Systems", country:"Netherlands", type:"Full-time", experience:"Senior", mode:"Hybrid", description:"Lead mechanical and system integration for next-generation subsea robotic platforms.", tags:["Subsea","Mechanical","Integration"], link:"#"},
  {title:"Controls Engineer — ROV Manipulator", company:"Tethys Robotics", country:"France", type:"Full-time", experience:"Mid-level", mode:"On-site", description:"Develop control algorithms for underwater robotic arms and manipulation tasks.", tags:["Control","Manipulator","ROV"], link:"#"}
];

function initJobsPage(){
  const results = document.getElementById("jobsResults");
  if(!results) return;

  const countrySelect = document.getElementById("jobCountry");
  [...new Set(jobs.map(j => j.country))].sort().forEach(country => {
    countrySelect.insertAdjacentHTML("beforeend", `<option>${country}</option>`);
  });

  const inputs = ["jobKeyword","jobCountry","jobType","jobExperience","jobMode"].map(id => document.getElementById(id));
  inputs.forEach(input => input.addEventListener("input", renderJobs));
  renderJobs();

  function renderJobs(){
    const keyword = document.getElementById("jobKeyword").value.toLowerCase();
    const country = document.getElementById("jobCountry").value;
    const type = document.getElementById("jobType").value;
    const experience = document.getElementById("jobExperience").value;
    const mode = document.getElementById("jobMode").value;

    const filtered = jobs.filter(job => {
      const text = `${job.title} ${job.company} ${job.description} ${job.tags.join(" ")}`.toLowerCase();
      return (!keyword || text.includes(keyword)) &&
             (!country || job.country === country) &&
             (!type || job.type === type) &&
             (!experience || job.experience === experience) &&
             (!mode || job.mode === mode);
    });

    document.getElementById("jobCount").textContent = `${filtered.length} job result(s) found`;
    results.innerHTML = filtered.map(job => `
      <article class="result-card">
        <h3>${job.title}</h3>
        <p class="meta">${job.company} • ${job.country} • ${job.type} • ${job.experience} • ${job.mode}</p>
        <p>${job.description}</p>
        <div class="tags">${job.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
        <a class="card-link" href="${job.link}">Application link &rarr;</a>
      </article>
    `).join("");
  }
}

// -------------------- Demo Research Paper Finder --------------------
// Static dataset for GitHub Pages.
// Future API integration idea:
// fetch(`https://api.openalex.org/works?search=${encodeURIComponent(topic)}`)
// or Crossref:
// fetch(`https://api.crossref.org/works?query=${encodeURIComponent(topic)}`)

const papers = [
  {title:"Vision-Based Control for Remotely Operated Underwater Vehicles", authors:"K. Smith, L. Ortega", year:2024, source:"IEEE", open:true, keywords:["ROV control","vision","underwater robotics"], abstract:"A study on image-based control approaches for observation-class ROVs.", link:"#"},
  {title:"A Review of Autonomous Underwater Vehicle Navigation Methods", authors:"M. Chen, R. Patel", year:2023, source:"Elsevier", open:false, keywords:["AUV navigation","sensor fusion","marine robotics"], abstract:"A review of navigation methods used in AUV missions, including INS, DVL, sonar, and SLAM.", link:"#"},
  {title:"Thruster Allocation and Optimization for Underwater Robots", authors:"A. Demir, S. Yılmaz", year:2022, source:"Springer", open:true, keywords:["thruster optimization","ROV","control allocation"], abstract:"Optimization-based allocation strategies for multi-thruster underwater vehicles.", link:"#"},
  {title:"Deep Learning for Marine Object Detection in Turbid Water", authors:"J. Brown, P. Novak", year:2025, source:"IEEE", open:true, keywords:["marine perception","object detection","YOLO"], abstract:"An evaluation of deep learning models for underwater object detection under low visibility.", link:"#"},
  {title:"Buoyancy and Stability Considerations for Small ROV Platforms", authors:"E. Kaya, N. Foster", year:2021, source:"MDPI", open:true, keywords:["buoyancy control","stability","ROV design"], abstract:"Design guidelines for buoyancy, center of gravity, and stability in small ROVs.", link:"#"},
  {title:"Human-Machine Interfaces for Offshore ROV Operations", authors:"S. Larsen, T. Moore", year:2020, source:"ACM", open:false, keywords:["HMI","ROV operation","offshore"], abstract:"A discussion of interface design principles for safer and clearer offshore ROV operation.", link:"#"}
];

function initPapersPage(){
  const results = document.getElementById("papersResults");
  if(!results) return;

  const yearSelect = document.getElementById("paperYear");
  [...new Set(papers.map(p => p.year))].sort((a,b)=>b-a).forEach(year => yearSelect.insertAdjacentHTML("beforeend", `<option>${year}</option>`));
  const sourceSelect = document.getElementById("paperSource");
  [...new Set(papers.map(p => p.source))].sort().forEach(source => sourceSelect.insertAdjacentHTML("beforeend", `<option>${source}</option>`));

  ["paperKeyword","paperYear","paperSource","paperSort","paperOpenAccess"].forEach(id => document.getElementById(id).addEventListener("input", renderPapers));
  renderPapers();

  function renderPapers(){
    const keyword = document.getElementById("paperKeyword").value.toLowerCase();
    const year = document.getElementById("paperYear").value;
    const source = document.getElementById("paperSource").value;
    const sort = document.getElementById("paperSort").value;
    const openOnly = document.getElementById("paperOpenAccess").checked;

    let filtered = papers.filter(paper => {
      const text = `${paper.title} ${paper.authors} ${paper.abstract} ${paper.keywords.join(" ")}`.toLowerCase();
      return (!keyword || text.includes(keyword)) &&
             (!year || String(paper.year) === year) &&
             (!source || paper.source === source) &&
             (!openOnly || paper.open);
    });

    if(sort === "newest") filtered = filtered.sort((a,b)=>b.year-a.year);

    document.getElementById("paperCount").textContent = `${filtered.length} paper result(s) found`;
    results.innerHTML = filtered.map(paper => `
      <article class="result-card">
        <h3>${paper.title}</h3>
        <p class="meta">${paper.authors} • ${paper.year} • ${paper.source} • ${paper.open ? "Open Access" : "Limited Access"}</p>
        <p>${paper.abstract}</p>
        <div class="tags">${paper.keywords.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
        <a class="card-link" href="${paper.link}">DOI / Source link &rarr;</a>
      </article>
    `).join("");
  }
}

// Careers application form
function initApplicationForm(){
  const form = document.getElementById("applicationForm");
  if(!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("applicationMessage").textContent = "Application received. Thank you for your interest in DeepDive Technologies!";
    form.reset();
  });
}

initJobsPage();
initPapersPage();
initApplicationForm();
