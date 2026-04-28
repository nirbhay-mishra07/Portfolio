import { useState, useEffect, useRef } from 'react'
import './index.css'

function useTypewriter(lines, speed=90, pause=1800) {
  const [display, setDisplay] = useState('')
  const [li, setLi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = lines[li]
    let t
    if (!del) {
      t = setTimeout(() => {
        setDisplay(cur.slice(0, ci+1))
        if (ci+1 === cur.length) { setTimeout(() => setDel(true), pause) } else { setCi(c=>c+1) }
      }, speed)
    } else {
      t = setTimeout(() => {
        setDisplay(cur.slice(0, ci-1))
        if (ci-1 === 0) { setDel(false); setLi(l=>(l+1)%lines.length); setCi(0) } else { setCi(c=>c-1) }
      }, 55)
    }
    return () => clearTimeout(t)
  }, [ci, del, li])
  return display
}

function useVisible(threshold=0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true) }, {threshold})
    if(ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function MatrixCorner() {
  const init = () => { let h=''; for(let r=0;r<16;r++){let row='';for(let c=0;c<9;c++) row+=Math.floor(Math.random()*256).toString(16).padStart(2,'0')+' ';h+=row+'\n'} return h }
  const [hex, setHex] = useState(init)
  useEffect(() => {
    const id = setInterval(() => {
      setHex(prev => {
        const rows=prev.split('\n'); const ri=Math.floor(Math.random()*(rows.length-1))
        const chars=rows[ri].split(''); const ci=Math.floor(Math.random()*4)*3
        const n=Math.floor(Math.random()*256).toString(16).padStart(2,'0')
        chars[ci]=n[0]; chars[ci+1]=n[1]; rows[ri]=chars.join(''); return rows.join('\n')
      })
    }, 110)
    return () => clearInterval(id)
  }, [])
  return <pre style={{position:'absolute',right:28,top:'50%',transform:'translateY(-50%)',fontSize:8,color:'rgba(0,255,65,0.09)',lineHeight:1.6,pointerEvents:'none',fontFamily:'Share Tech Mono,monospace'}}>{hex}</pre>
}

function SectionHead({num,title}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
      <span style={{fontSize:10,color:'#007722',letterSpacing:2}}>{num}</span>
      <span style={{fontFamily:'Orbitron,monospace',fontSize:16,fontWeight:700,color:'#00ff41'}}>{title}</span>
      <div className="section-line"/>
    </div>
  )
}

function Navbar() {
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn)},[])
  const go=(id)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  return (
    <nav style={{position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 32px',borderBottom:'1px solid rgba(0,255,65,0.15)',background:scrolled?'rgba(8,8,8,0.98)':'rgba(8,8,8,0.9)',backdropFilter:'blur(12px)',transition:'background 0.3s'}}>
      <div style={{fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:900,letterSpacing:4,color:'#00ff41',textShadow:'0 0 20px rgba(0,255,65,0.4)'}}>NM<span style={{color:'#007722'}}>_</span>SEC</div>
      <div style={{display:'flex',gap:32}}>
        {['about','skills','projects','contact'].map(s=><span key={s} className="nav-link" onClick={()=>go(s)}>./{s}</span>)}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,fontSize:9,letterSpacing:2,padding:'4px 12px',border:'1px solid #00ff41',color:'#00ff41'}}>
        <span style={{width:6,height:6,borderRadius:'50%',background:'#00ff41',display:'inline-block',animation:'pglow 1.5s ease-in-out infinite'}}/>
        OPEN TO WORK
      </div>
    </nav>
  )
}

function Hero() {
  const tw=useTypewriter(['./whoami','Ethical Hacker','./scan --target web','Pentester & Dev','./ctf --pwn'])
  return (
    <section style={{padding:'80px 32px 64px',position:'relative',overflow:'hidden',minHeight:420}}>
      <div className="grid-bg" style={{position:'absolute',inset:0,pointerEvents:'none'}}/>
      <MatrixCorner/>
      <div style={{position:'relative',animation:'fadeup 0.6s ease both'}}>
        <div style={{fontSize:10,color:'#007722',letterSpacing:4,marginBottom:14}}>// ETHICAL HACKER &nbsp;•&nbsp; PENTESTER &nbsp;•&nbsp; DEVELOPER</div>
        <div style={{fontFamily:'Orbitron,monospace',fontSize:'clamp(32px,6vw,52px)',fontWeight:900,lineHeight:1.05,marginBottom:14,color:'#00ff41',textShadow:'0 0 60px rgba(0,255,65,0.2)'}}>
          NIRBHAY<br/><span style={{color:'#007722'}}>MISHRA</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}>
          <span style={{fontSize:12,color:'#007722'}}>root@kali:~$&nbsp;</span>
          <span style={{fontSize:13,color:'#00ff41',letterSpacing:1}}>{tw}</span>
          <span className="caret"/>
        </div>
        <p style={{fontSize:12,color:'#555',lineHeight:2,maxWidth:500,marginBottom:32}}>
          BCA student @ <span style={{color:'#00cc33'}}>Bennett University</span> · Batch of <span style={{color:'#00cc33'}}>2028</span> · Greater Noida<br/>
          Breaking things ethically, building them back better.<br/>
          Active member @ <span style={{color:'#00cc33'}}>DevDen Club</span> — CTFs, DevOps, Pentesting.
        </p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
          <a href="https://github.com/nirbhay-mishra07" target="_blank" rel="noreferrer"><button className="btn-primary">[ GITHUB ]</button></a>
          <a href="https://www.linkedin.com/in/nirbhay-mishra-17407536a" target="_blank" rel="noreferrer"><button className="btn-secondary">[ LINKEDIN ]</button></a>
          <button className="btn-secondary" onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>[ CONTACT ]</button>
        </div>
      </div>
    </section>
  )
}

function About() {
  const [ref,visible]=useVisible()
  const lines=[
    {p:'nirbhay@kali:~$',c:' whoami',o:'Nirbhay Mishra — BCA @ Bennett University (2028), Greater Noida'},
    {p:'nirbhay@kali:~$',c:' cat mission.txt',o:'Find vulnerabilities before the attackers do.'},
    {p:'nirbhay@kali:~$',c:' cat interests.txt',o:'Web Pentesting · Network Recon · CTF Challenges · DevOps · IoT Security'},
    {p:'nirbhay@kali:~$',c:' cat contact.txt',o:'mishra.nirbhay.it@outlook.com · +91 9389953802'},
    {p:'nirbhay@kali:~$',c:' echo $STATUS',o:'▶ OPEN TO INTERNSHIPS & SECURITY ROLES',green:true},
  ]
  return (
    <section id="about" style={{padding:'48px 32px',borderTop:'1px solid rgba(0,255,65,0.1)'}}>
      <SectionHead num="01" title="ABOUT"/>
      <div ref={ref} style={{border:'1px solid rgba(0,255,65,0.15)',background:'#0c0c0c',overflow:'hidden',opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'opacity 0.6s,transform 0.6s'}}>
        <div style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',background:'#0f0f0f',borderBottom:'1px solid rgba(0,255,65,0.1)'}}>
          {['#ff5f56','#ffbd2e','#27c93f'].map(c=><div key={c} style={{width:8,height:8,borderRadius:'50%',background:c}}/>)}
          <span style={{fontSize:9,color:'#007722',marginLeft:8,letterSpacing:1}}>nirbhay@kali — zsh</span>
        </div>
        <div style={{padding:'16px 20px',fontSize:12,lineHeight:2.2}}>
          {lines.map((l,i)=>(
            <div key={i} style={{marginTop:i>0?8:0}}>
              <div><span style={{color:'#007722'}}>{l.p}</span><span style={{color:'#00ff41'}}>{l.c}</span></div>
              <div style={{paddingLeft:4,color:l.green?'#00ff41':'#666'}}>{l.o}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SKILLS=[
  {cat:'LANG',name:'Java',pct:78,sub:'OOP · Android · DSA'},
  {cat:'LANG',name:'C / C++',pct:72,sub:'Systems · Memory · Algorithms'},
  {cat:'LANG',name:'Python',pct:74,sub:'Scripting · Automation · Exploits'},
  {cat:'SEC',name:'Web Pentesting',pct:65,sub:'Burp Suite · OWASP Top 10 · XSS · SQLi'},
  {cat:'SEC',name:'Network Recon',pct:62,sub:'Nmap · Wireshark · Metasploit'},
  {cat:'DEVOPS',name:'Git / GitHub',pct:82,sub:'Version control · CI/CD · Collaboration'},
  {cat:'WEB',name:'React / JS',pct:70,sub:'Hooks · Components · Vite'},
  {cat:'OS',name:'Linux / Kali',pct:76,sub:'Shell · Bash · Privilege Escalation'},
]

function SkillCard({cat,name,pct,sub,delay}) {
  const [ref,visible]=useVisible(0.1)
  return (
    <div ref={ref} className="sk-card" style={{opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:`opacity 0.5s ${delay}s,transform 0.5s ${delay}s`}}>
      <div style={{fontSize:8,letterSpacing:3,color:'#007722',marginBottom:8}}>{cat}</div>
      <div style={{fontSize:13,color:'#00ff41',marginBottom:10}}>{name}</div>
      <div className="skill-bar"><div className="skill-bar-fill" style={{width:visible?`${pct}%`:'0%'}}/></div>
      <div style={{fontSize:9,color:'#007722',marginTop:6,letterSpacing:1}}>{sub}</div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" style={{padding:'48px 32px',borderTop:'1px solid rgba(0,255,65,0.1)'}}>
      <SectionHead num="02" title="ARSENAL"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:10}}>
        {SKILLS.map((s,i)=><SkillCard key={s.name} {...s} delay={i*0.07}/>)}
      </div>
    </section>
  )
}

const PROJECTS=[
  {type:'SECURITY TOOL',name:'REAL-TIME IDS',desc:'Engineered a real-time Intrusion Detection System — log aggregation, anomaly detection, NVD API CVE cross-referencing, and custom alerting dashboard.',tags:['Python','NVD API','Anomaly Detection','Dashboard'],link:'https://github.com/nirbhay-mishra07'},
  {type:'IOT SECURITY',name:'SMARTHELMET',desc:'IoT dashboard for smart safety helmet — live accident detection, SOS alerts, GPS tracking, WebSocket real-time metrics, dark command-center UI in React.',tags:['React','WebSockets','IoT','GPS'],link:'https://github.com/nirbhay-mishra07'},
  {type:'AUTOMATION',name:'VULN SCANNER',desc:'Python CLI tool — port enumeration, service fingerprinting, CVE lookup via NVD API. Generates structured JSON/HTML vulnerability reports with CVSS scores.',tags:['Python','Nmap','CVE API','CLI'],link:'https://github.com/nirbhay-mishra07'},
  {type:'CTF / RESEARCH',name:'CTF WRITEUPS',desc:'Documented CTF challenge solutions — web exploitation, cryptography, OSINT, reverse engineering. Published writeups on GitHub.',tags:['CTF','OSINT','Crypto','RevEng'],link:'https://github.com/nirbhay-mishra07'},
]

function ProjectCard({type,name,desc,tags,link,delay}) {
  const [ref,visible]=useVisible(0.1)
  return (
    <div ref={ref} className="card-hover" style={{padding:20,cursor:'pointer',opacity:visible?1:0,transform:visible?'none':'translateY(14px)',transition:`opacity 0.5s ${delay}s,transform 0.5s ${delay}s`}} onClick={()=>window.open(link,'_blank')}>
      <div style={{position:'absolute',top:18,right:18,fontSize:12,color:'#007722'}}>↗</div>
      <div style={{fontSize:8,letterSpacing:3,color:'#007722',marginBottom:10}}>{type}</div>
      <div style={{fontFamily:'Orbitron,monospace',fontSize:13,color:'#00ff41',marginBottom:10}}>{name}</div>
      <p style={{fontSize:11,color:'#555',lineHeight:1.8,marginBottom:14}}>{desc}</p>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        {tags.map(t=><span key={t} style={{fontSize:8,padding:'2px 8px',border:'1px solid rgba(0,255,65,0.2)',color:'#007722',letterSpacing:1}}>{t}</span>)}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" style={{padding:'48px 32px',borderTop:'1px solid rgba(0,255,65,0.1)'}}>
      <SectionHead num="03" title="OPERATIONS"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:12}}>
        {PROJECTS.map((p,i)=><ProjectCard key={p.name} {...p} delay={i*0.1}/>)}
      </div>
    </section>
  )
}

const CONTACTS=[
  {label:'GITHUB',val:'nirbhay-mishra07',link:'https://github.com/nirbhay-mishra07'},
  {label:'LINKEDIN',val:'nirbhay-mishra',link:'https://www.linkedin.com/in/nirbhay-mishra-17407536a'},
  {label:'EMAIL',val:'mishra.nirbhay.it',link:'mailto:mishra.nirbhay.it@outlook.com'},
  {label:'PHONE',val:'+91 9389953802',link:'tel:+919389953802'},
  {label:'UNIVERSITY',val:'Bennett Univ.',link:null},
  {label:'LOCATION',val:'Greater Noida, IN',link:null},
]

function Contact() {
  const [ref,visible]=useVisible()
  return (
    <section id="contact" style={{padding:'48px 32px',borderTop:'1px solid rgba(0,255,65,0.1)'}}>
      <SectionHead num="04" title="CONNECT"/>
      <div ref={ref} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10,opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:'opacity 0.6s,transform 0.6s'}}>
        {CONTACTS.map(c=>(
          <div key={c.label} className="contact-card" onClick={()=>c.link&&window.open(c.link,'_blank')}>
            <div style={{fontSize:8,letterSpacing:3,color:'#007722',marginBottom:6,position:'relative'}}>{c.label}</div>
            <div style={{fontSize:11,color:'#00ff41',position:'relative'}}>{c.val}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <div className="scanline-overlay"/>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <footer style={{padding:'14px 32px',display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid rgba(0,255,65,0.1)',fontSize:9,color:'#007722',letterSpacing:1}}>
        <span>© 2025 NIRBHAY MISHRA</span>
        <span>BENNETT UNIVERSITY &nbsp;|&nbsp; BCA 2028</span>
        <span>DEVDEN CLUB</span>
      </footer>
    </>
  )
}
