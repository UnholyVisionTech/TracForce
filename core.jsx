   §7 — MAIN COMPONENT: STATE DECLARATIONS & HANDLERS
   This is the core TracForce function with all state.
   Standalone: handlers.js (extract pure functions)
   ══════════════════════════════════════════════════════════ */
function TracForce(){
  const [role,setRole]=useState("Master");
  const [acctDrop,setAcctDrop]=useState(false);
  const [sec,setSec]=useState("dashboard");
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("info");
  const [q,setQ]=useState("");
  const [note,setNote]=useState("");
  const [on,setOn]=useState(false);
  const [team,setTeam]=useState(TEAM_INIT);
  const [clients,setClients]=useState(CL_INIT);
  const [nts,setNts]=useState(NT_INIT);
  const [cls,setCls]=useState(CALLS_INIT);
  const [sales,setSales]=useState(SALES_INIT);
  const [posts,setPosts]=useState(initPosts);
  const [selMember,setSelMember]=useState(null);
  const [assignModal,setAssignModal]=useState(null);
  const [settingsTab,setSettingsTab]=useState("general");
  const [textSize,setTextSize]=useState(1.1);
  const [pendingTextSize,setPendingTextSize]=useState(1.1);
  const [selRole,setSelRole]=useState(null);
  const [viewPosts,setViewPosts]=useState(null);
  const [newPost,setNewPost]=useState("");
  const [leadFilter,setLeadFilter]=useState("All");
  const [addClientModal,setAddClientModal]=useState(false);
  const [importModal,setImportModal]=useState(false);
  const [importFile,setImportFile]=useState(null);
  const [importRows,setImportRows]=useState([]);
  const [importDest,setImportDest]=useState("Main Database");
  const [importStatus,setImportStatus]=useState(null);
  const [uploadFile,setUploadFile]=useState(null);
  const [uploadDest,setUploadDest]=useState("Main Database");
  const [assignLeadModal,setAssignLeadModal]=useState(null);
  const [uploadMyLeadsModal,setUploadMyLeadsModal]=useState(false);
  const [newCl,setNewCl]=useState({name:"",co:"",em:"",ph:"",ti:"Pro",lead:"Warm",dest:"Main Database",listTag:null});
  const DESTINATIONS=["Main Database","Outbound Leads","Inbound Leads","Partner Referrals","Event Contacts"];
  const [activeList,setActiveList]=useState(null);
  const [myLeads,setMyLeads]=useState(false);
  const [listFilter,setListFilter]=useState([]);
  const [listDrop,setListDrop]=useState(false);
  const [customLists,setCustomLists]=useState([]);
  const [newListModal,setNewListModal]=useState(false);
  const [newListName,setNewListName]=useState("");
  const [newListColor,setNewListColor]=useState("#3b5bdb");
  const [kpiMember,setKpiMember]=useState(null);
  const [kpiRange,setKpiRange]=useState("1m");
  const [kpiDrop,setKpiDrop]=useState(false);
  const [kpiFrom,setKpiFrom]=useState("2026-01-01");
  const [kpiTo,setKpiTo]=useState("2026-02-25");
  const [kpiCustomView,setKpiCustomView]=useState(false);
  const [saleModal,setSaleModal]=useState(null);
  const [aqEntries,setAqEntries]=useState([
    {id:1,d:"2026-02-20",source:"Google Ads",category:"Paid Search",service:"PPC Campaign — Enterprise",cost:4500,leads:32,cpl:140.63,status:"active"},
    {id:2,d:"2026-02-18",source:"LinkedIn Ads",category:"Social Media",service:"Sponsored InMail — Decision Makers",cost:2800,leads:18,cpl:155.56,status:"active"},
    {id:3,d:"2026-02-15",source:"Trade Show",category:"Events",service:"SaaS Summit 2026 — Booth #14",cost:8500,leads:45,cpl:188.89,status:"completed"},
    {id:4,d:"2026-02-10",source:"Content Marketing",category:"Organic",service:"Whitepaper — Cloud Migration Guide",cost:1200,leads:28,cpl:42.86,status:"active"},
    {id:5,d:"2026-02-05",source:"Facebook Ads",category:"Social Media",service:"Retargeting Campaign Q1",cost:1800,leads:14,cpl:128.57,status:"active"},
    {id:6,d:"2026-01-28",source:"Referral Program",category:"Partnership",service:"Partner Incentive Tier 2",cost:3000,leads:22,cpl:136.36,status:"active"},
    {id:7,d:"2026-01-20",source:"SEO",category:"Organic",service:"Blog + Backlink Campaign",cost:950,leads:35,cpl:27.14,status:"active"},
    {id:8,d:"2026-01-15",source:"Email Campaign",category:"Direct",service:"Nurture Sequence — Cold Leads",cost:600,leads:12,cpl:50.00,status:"completed"},
    {id:9,d:"2026-01-10",source:"Webinar",category:"Events",service:"Product Demo Webinar Jan",cost:2200,leads:38,cpl:57.89,status:"completed"},
    {id:10,d:"2026-01-05",source:"Google Ads",category:"Paid Search",service:"Brand Campaign — Competitor KW",cost:3200,leads:24,cpl:133.33,status:"paused"}
  ]);
  const [aqModal,setAqModal]=useState(false);
  const [aqCsvText,setAqCsvText]=useState("");
  const [aqTab,setAqTab]=useState("manual");
  const [aqManual,setAqManual]=useState({source:"",category:"",service:"",cost:"",leads:"",d:new Date().toISOString().slice(0,10)});
  const [aqHistory,setAqHistory]=useState([
    {id:1,ts:"2026-02-20 09:15",type:"manual",count:3,entries:[1,2,3],label:"Initial seed — Google, LinkedIn, Trade Show"},
    {id:2,ts:"2026-02-15 14:30",type:"csv",count:4,entries:[4,5,6,7],label:"CSV import — Content, Facebook, Referral, SEO"},
    {id:3,ts:"2026-02-10 11:00",type:"csv",count:3,entries:[8,9,10],label:"CSV import — Email, Webinar, Google Ads"}
  ]);
  const [aqHistoryOpen,setAqHistoryOpen]=useState(false); // null or {clientId, sale} for editing, or {clientId} for new
  const BUILT_IN_LISTS=[{id:"new",name:"New",color:"#3b5bdb",icon:"plus"},{id:"pending",name:"Pending",color:"#f59e0b",icon:"clock"},{id:"past",name:"Past",color:"#94a3b8",icon:"clock"},{id:"sold",name:"Sold",color:"#059669",icon:"check"},{id:"cancelled",name:"Cancelled",color:"#ef4444",icon:"x"},{id:"dnc",name:"DNC",color:"#7c3aed",icon:null}];
  const DB_LISTS=[
    {id:"db1",name:"Database 1",dests:["Main Database"],color:"#3b5bdb",icon:"db"},
    {id:"db2",name:"Database 2",dests:["Inbound Leads","Partner Referrals"],color:"#7c3aed",icon:"signal"},
    {id:"db3",name:"Database 3",dests:["Outbound Leads","Event Contacts"],color:"#0891b2",icon:"users"},
  ];
  // Dial page
  const [dialClient,setDialClient]=useState(null);
  const [emailCopied,setEmailCopied]=useState(false);
  const [dialMethod,setDialMethod]=useState(null);
  const [dialActive,setDialActive]=useState(false);
  const [auditModal,setAuditModal]=useState(false);
  const [reportModal,setReportModal]=useState(false);
  const [reportType,setReportType]=useState("team");
  const [reportExclude,setReportExclude]=useState([]);
  const [reportInclude,setReportInclude]=useState(()=>team.filter(m=>m.role!=="Client").map(m=>m.id));
  const [roleIndividual,setRoleIndividual]=useState({});
  const [reportGenerated,setReportGenerated]=useState(false);
  const [reportRange,setReportRange]=useState("12m");
  const [reportFrom,setReportFrom]=useState("2025-03-01");
  const [reportTo,setReportTo]=useState("2026-02-25");
  const [reportDrop,setReportDrop]=useState(false);
  const [dialTimer,setDialTimer]=useState(0);
  const [editCl,setEditCl]=useState(null);
  const [playingCall,setPlayingCall]=useState(null);
  const [notesModal,setNotesModal]=useState(false);
  const [dashTab,setDashTab]=useState("appointments");
  const timerRef=useRef(null);

  // Upcoming appointments - demo data
  const [appointments,setAppointments]=useState(()=>{
    const today=new Date();const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const addDays=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
    return [
      {id:"apt1",clientId:"c1",date:fmt(addDays(today,1)),time:"10:00 AM",type:"Follow-up Call",notes:"Discuss renewal terms"},
      {id:"apt2",clientId:"c3",date:fmt(addDays(today,2)),time:"2:30 PM",type:"Product Demo",notes:"Show new dashboard features"},
      {id:"apt3",clientId:"c5",date:fmt(addDays(today,3)),time:"11:00 AM",type:"Onboarding",notes:"Initial setup walkthrough"},
      {id:"apt4",clientId:"c2",date:fmt(addDays(today,5)),time:"9:00 AM",type:"Quarterly Review",notes:"Q1 performance review"},
      {id:"apt5",clientId:"c8",date:fmt(addDays(today,7)),time:"3:00 PM",type:"Follow-up Call",notes:"Check on implementation progress"},
    ];
  });
  const [apptModal,setApptModal]=useState(null); // null or {clientId, date, time, type, notes, id?}
  const APPT_TYPES=["Follow-up Call","Product Demo","Onboarding","Quarterly Review","Strategy Session","Check-in"];
  const addAppointment=(apt)=>{const id="apt"+Date.now();setAppointments(p=>[...p,{...apt,id}]);setApptModal(null);};
  const updateAppointment=(apt)=>{setAppointments(p=>p.map(a=>a.id===apt.id?apt:a));setApptModal(null);};
  const deleteAppointment=(id)=>{setAppointments(p=>p.filter(a=>a.id!==id));setApptModal(null);};
  const openNewAppt=(clientId)=>{const today=new Date();const fmt2=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;setApptModal({clientId:clientId||null,date:fmt2(today),time:"10:00 AM",type:"Follow-up Call",notes:"",isNew:true});};

  useEffect(()=>{setOn(true)},[]);
  useEffect(()=>{if(dialActive){timerRef.current=setInterval(()=>setDialTimer(t=>t+1),1000);return()=>clearInterval(timerRef.current);}else{clearInterval(timerRef.current);}},[dialActive]);

  const curUser=team.find(m=>m.role===role);
  const curUserId=curUser?.id;
  const fc=clients.filter(c=>{const mq=c.name.toLowerCase().includes(q.toLowerCase())||c.co.toLowerCase().includes(q.toLowerCase());const ml=leadFilter==="All"||c.lead===leadFilter;const dl=!activeList||DB_LISTS.find(d=>d.id===activeList)?.dests.includes(c.dest);const myL=!myLeads||c.assignedTo===curUserId;const lf=!listFilter.length||(listFilter.includes("dnc")&&c.lead==="DNC")||(listFilter.filter(f=>f!=="dnc").some(f=>c.listTag===f));return mq&&ml&&dl&&myL&&lf;});
  const assignableRoles=ar=>ROLE_ORDER.filter((_,i)=>i>roleIdx(ar)&&i<ROLE_ORDER.length-1);
  const handleRoleChange=(mid,nr)=>{setTeam(p=>p.map(m=>m.id===mid?{...m,role:nr}:m));setAssignModal(null);};
  const handlePhoto=(id,isClient)=>{const input=document.createElement("input");input.type="file";input.accept="image/*";input.onchange=e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>{if(isClient)setClients(p=>p.map(c=>c.id===id?{...c,photo:ev.target.result}:c));else setTeam(p=>p.map(m=>m.id===id?{...m,photo:ev.target.result}:m));};r.readAsDataURL(f);}};input.click();};
  const addPost=(mid)=>{if(!newPost.trim())return;setPosts(p=>({...p,[mid]:[{id:"p"+Date.now(),date:new Date().toISOString().slice(0,16).replace("T"," "),text:newPost.trim()},...(p[mid]||[])]}));setNewPost("");};
  const parseCSV=(text)=>{const lines=text.trim().split("\n").map(l=>l.split(",").map(c=>c.trim().replace(/^"|"$/g,"")));if(lines.length<2)return[];const hdr=lines[0].map(h=>h.toLowerCase());const ni=hdr.findIndex(h=>h.includes("name"));const ci=hdr.findIndex(h=>h.includes("company")||h.includes("co"));const ei=hdr.findIndex(h=>h.includes("email")||h.includes("mail"));const pi=hdr.findIndex(h=>h.includes("phone")||h.includes("ph"));const si=hdr.findIndex(h=>h.includes("status")||h.includes("st"));const ti=hdr.findIndex(h=>h.includes("tier")||h.includes("ti"));const li=hdr.findIndex(h=>h.includes("lead"));return lines.slice(1).filter(r=>r[ni>=0?ni:0]?.trim()).map(r=>({name:r[ni>=0?ni:0]||"Unknown",co:r[ci>=0?ci:1]||"",em:r[ei>=0?ei:2]||"",ph:r[pi>=0?pi:3]||"",st:r[si>=0?si:4]||"Active",ti:r[ti>=0?ti:5]||"Pro",lead:r[li>=0?li:6]||"Warm"}));};
  const handleFileUpload=(file,cb)=>{if(!file)return;const reader=new FileReader();reader.onload=e=>{const text=e.target.result;const rows=parseCSV(text);cb(rows);};reader.readAsText(file);};
  const doImport=(rows,dest,assignTo)=>{const newClients=rows.map((r,i)=>({id:Date.now()+i,name:r.name,co:r.co,em:r.em,ph:r.ph,st:r.st,lc:new Date().toISOString().slice(0,10),ti:r.ti,photo:null,lead:r.lead,dest:dest,assignedTo:assignTo||null,listTag:null}));setClients(p=>[...p,...newClients]);return newClients.length;};
  const exportCSV=()=>{try{const hdr="Name,Company,Email,Phone,Status,Tier,Lead,Database,Last Contact,Assigned To\n";const rows=clients.map(c=>{const assigned=team.find(m=>m.id===c.assignedTo);return [c.name,c.co,c.em,c.ph,c.st,c.ti,c.lead,c.dest,c.lc,assigned?assigned.name:"Unassigned"].map(v=>'"'+String(v||"").replace(/"/g,'""')+'"').join(",");}).join("\n");const blob=new Blob([hdr+rows],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="tracforce_clients_"+new Date().toISOString().slice(0,10)+".csv";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),100);}catch(e){console.error("Export failed:",e);}};
  const exportAuditCSV=(logs)=>{try{const hdr="Timestamp,User,Action,Category\n";const rows=logs.map(l=>[l.t,l.u,l.a,l.cat].map(v=>'"'+String(v||"").replace(/"/g,'""')+'"').join(",")).join("\n");const blob=new Blob([hdr+rows],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="tracforce_audit_"+new Date().toISOString().slice(0,10)+".csv";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),100);}catch(e){console.error("Export failed:",e);}};
  const updateClient=(id,f,v)=>{setClients(p=>p.map(c=>c.id===id?{...c,[f]:v}:c));};
  const openDial=(c)=>{setDialClient(c);setDialMethod(null);setDialActive(false);setDialTimer(0);setEditCl(null);setPlayingCall(null);};
  const navTo=(s)=>{setSec(s);setSel(null);setSelMember(null);setSelRole(null);setViewPosts(null);setDialClient(null);setDialActive(false);setDialTimer(0);setActiveList(null);setLeadFilter("All");setMyLeads(false);setListFilter([]);setListDrop(false);setKpiMember(null);if(s==="settings")setPendingTextSize(textSize);};

  const Avatar=({src,fallback,color,size=34,click})=><div onClick={click} style={{width:size,height:size,borderRadius:"50%",background:src?"transparent":(color||"#f0f2f5"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:700,color:color?"#fff":"#64748b",cursor:click?"pointer":"default",overflow:"hidden",border:src?`2px solid ${color||"#e2e5ea"}`:"none",flexShrink:0}}>{src?<img src={src} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:fallback}</div>;
  const PhotoAvatar=({src,fallback,color,size=56,onClick})=><div onClick={onClick} style={{width:size,height:size,borderRadius:"50%",background:src?"transparent":(color?color+"20":"#f0f2f5"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:700,color:color||"#64748b",cursor:onClick?"pointer":"default",overflow:"hidden",position:"relative",border:src?`2px solid ${color||"#d0d5dd"}`:`2px dashed ${color?color+"40":"#d0d5dd"}`,flexShrink:0}}>{src?<img src={src} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:fallback}{onClick&&<div style={{position:"absolute",bottom:0,right:0,width:size*0.3,height:size*0.3,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #e2e5ea"}}><Ic t="camera" s={size*0.16}/></div>}</div>;
  const Back=({label,onClick})=><button onClick={onClick} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:"#64748b",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:14,padding:0}}><span style={{transform:"rotate(180deg)",display:"inline-flex"}}><Ic t="chev" s={14}/></span>{label}</button>;
  const Card=({children,style:s,...rest})=><div style={{background:"#fff",borderRadius:12,border:"1px solid #eef0f2",...s}} {...rest}>{children}</div>;
  const Stat=({label,val,icon,color})=><Card style={{padding:"18px 20px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,width:"100%",height:3,background:color}}/><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6,color:"#94a3b8"}}><Ic t={icon} s={14}/><span style={{fontSize:11,fontWeight:500,textTransform:"uppercase",letterSpacing:0.5}}>{label}</span></div><div style={{fontSize:24,fontWeight:700,letterSpacing:-0.5}}>{val}</div></Card>;

  const LeadBadge=({lead,size="sm"})=><span style={{fontSize:size==="sm"?10:11,fontWeight:600,padding:size==="sm"?"2px 8px":"3px 10px",borderRadius:20,background:leadBg(lead),color:leadColor(lead),display:"inline-flex",alignItems:"center",gap:3}}><span style={{width:size==="sm"?5:6,height:size==="sm"?5:6,borderRadius:"50%",background:leadColor(lead)}}/>{lead}</span>;


  /* ════════════════════════════════════════════════════════
     §8 — DIAL PAGE COMPONENT
     Standalone: DialPage.jsx
     Depends on: React, §2, §3, §4, §7 (state)
     ════════════════════════════════════════════════════════ */
  /* ======================== DIAL PAGE ======================== */
  const DialPage=()=>{
    const c=clients.find(x=>x.id===dialClient.id)||dialClient;
    const me=team[0];
    const clientCalls=cls[c.id]||[];
    const clientNotes=nts[c.id]||[];

    return <div>
      <Back label="Back to Client" onClick={()=>{setDialClient(null);setDialActive(false);setDialTimer(0);}}/>

      {c.lead==="DNC"&&<div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 18px",borderRadius:10,background:"#f5f3ff",border:"1px solid #7c3aed30",marginBottom:16}}><svg viewBox="0 0 24 24" style={{width:18,height:18,stroke:"#7c3aed",strokeWidth:2,fill:"none",flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg><div style={{flex:1,fontSize:13,color:"#7c3aed",fontWeight:500}}>This client is on the <strong>Do Not Contact</strong> list. Remove from DNC to enable dialing.</div><button onClick={()=>{updateClient(c.id,"lead","Warm");}} style={{padding:"6px 14px",borderRadius:8,border:"1px solid #7c3aed",background:"#fff",color:"#7c3aed",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Remove DNC</button></div>}

      {/* Two column layout: left = call panel, right = notes & calls */}
      <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:18,alignItems:"start"}}>

        {/* LEFT: Call panel + lead status */}
        <div style={{position:"sticky",top:0}}>
          <Card style={{overflow:"hidden",marginBottom:14}}>
            <div style={{background:dialActive?"#059669":"#1a1a2e",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background 0.3s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,color:"#fff"}}><Ic t={dialActive?"signal":"phone"} s={15}/><span style={{fontWeight:600,fontSize:13}}>{dialActive?"In Progress":"Dial"}</span>{dialActive&&<span style={{color:"rgba(255,255,255,0.8)",fontSize:13,fontFamily:"monospace"}}>{fmtSec(dialTimer)}</span>}</div>
              {dialActive&&<span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",animation:"pulse 1.5s infinite"}}/>}
            </div>
            <div style={{padding:"20px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:1,color:"#94a3b8",fontWeight:600,marginBottom:6}}>You</div>
                  <PhotoAvatar src={me.photo} fallback={me.avatar} color={roleBg(me.role)} size={48} onClick={()=>handlePhoto(me.id,false)}/>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4,color:"#94a3b8"}}><div style={{width:20,height:2,background:dialActive?"#059669":"#e2e5ea"}}/><Ic t="phone" s={12}/><div style={{width:20,height:2,background:dialActive?"#059669":"#e2e5ea"}}/></div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:1,color:"#94a3b8",fontWeight:600,marginBottom:6}}>Client</div>
                  <PhotoAvatar src={c.photo} fallback={ini(c.name)} size={48} onClick={()=>handlePhoto(c.id,true)}/>
                </div>
              </div>
              <div style={{fontWeight:600,fontSize:15}}>{c.name}</div>
              <div style={{fontSize:12,color:"#94a3b8"}}>{c.co} · {c.ph}</div>

              {/* Dial controls */}
              <div style={{marginTop:14,width:"100%"}}>
                {!dialActive&&!dialMethod&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {[["phone","Own Phone"],["mic","TracForce"],["link","3rd Party"]].map(([ic,l])=>(
                    <button key={ic} onClick={()=>setDialMethod(ic)} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:500,color:"#374151",width:"100%",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}><Ic t={ic} s={14}/>{l}</button>
                  ))}
                </div>}
                {dialMethod&&!dialActive&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{fontSize:12,color:"#64748b",textAlign:"center"}}>{dialMethod==="phone"?"Own Phone":dialMethod==="mic"?"TracForce Dialer":"3rd Party"} <button onClick={()=>setDialMethod(null)} style={{fontSize:11,color:"#94a3b8",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",marginLeft:4}}>change</button></div>
                  <button onClick={()=>{if(c.lead!=="DNC")setDialActive(true);}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"10px",borderRadius:8,border:"none",background:c.lead==="DNC"?"#e2e5ea":"#059669",color:c.lead==="DNC"?"#94a3b8":"#fff",fontSize:13,fontWeight:600,cursor:c.lead==="DNC"?"not-allowed":"pointer",fontFamily:"inherit",width:"100%"}}><Ic t="phone" s={15}/>{c.lead==="DNC"?"DNC — Cannot Dial":"Start Call"}</button>
                </div>}
                {dialActive&&<button onClick={()=>{setDialActive(false);setDialTimer(0);}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"10px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",width:"100%"}}><Ic t="x" s={15}/>End Call</button>}
              </div>
            </div>
          </Card>

          {/* Lead Status */}
          <Card style={{padding:"16px 20px"}}>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:0.8,color:"#94a3b8",fontWeight:600,marginBottom:10}}>Lead Status</div>
            <div style={{display:"flex",gap:6}}>
              {["Hot","Warm","Cold","DNC"].map(l=>(
                <button key={l} onClick={()=>updateClient(c.id,"lead",l)} style={{flex:1,padding:"8px 0",borderRadius:8,border:c.lead===l?`2px solid ${leadColor(l)}`:"1px solid #e2e5ea",background:c.lead===l?leadBg(l):"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,color:c.lead===l?leadColor(l):"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",gap:4,transition:"all 0.15s"}}>
                  {l==="Hot"&&<Ic t="flame" s={13}/>}{l}
                </button>
              ))}
            </div>
            <div style={{marginTop:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600}}>Status</div><div style={{display:"flex",alignItems:"center",gap:4,marginTop:3}}>{["Active","Pending","Inactive"].map(st=>(<button key={st} onClick={()=>setClients(p=>p.map(x=>x.id===c.id?{...x,st}:x))} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:6,border:c.st===st?"1px solid "+stColor(st):"1px solid transparent",background:c.st===st?stColor(st)+"18":"transparent",color:c.st===st?stColor(st):"#cbd5e1",fontSize:11,fontWeight:c.st===st?600:400,cursor:"pointer",fontFamily:"inherit"}}><span style={{width:6,height:6,borderRadius:"50%",background:c.st===st?stColor(st):"#e2e5ea"}}/>{st}</button>))}</div></div>
              <div><div style={{fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600}}>Tier</div><span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:10,background:tBg(c.ti),color:tC(c.ti),marginTop:3,display:"inline-block"}}>{c.ti}</span></div>
            </div>
            <div style={{marginTop:12}}><div style={{fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600,marginBottom:6}}>List</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{[{id:"none",name:"None",color:"#94a3b8"},...BUILT_IN_LISTS.filter(b=>b.id!=="dnc"),...customLists].map(lt=>(<button key={lt.id} onClick={()=>updateClient(c.id,"listTag",lt.id==="none"?null:lt.id)} style={{padding:"3px 8px",borderRadius:6,border:(c.listTag||"none")===lt.id?"1px solid "+lt.color:"1px solid #e2e5ea",background:(c.listTag||"none")===lt.id?lt.color+"18":"transparent",color:(c.listTag||"none")===lt.id?lt.color:"#cbd5e1",fontSize:11,fontWeight:(c.listTag||"none")===lt.id?600:400,cursor:"pointer",fontFamily:"inherit"}}>{lt.name}</button>))}</div></div>
          </Card>

          {/* Book Appointment */}
          <Card style={{padding:"16px 20px"}}>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:0.8,color:"#94a3b8",fontWeight:600,marginBottom:10}}>Appointments</div>
            <button onClick={()=>openNewAppt(c.id)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"9px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151",width:"100%",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}><Ic t="plus" s={14}/>Book Appointment</button>
            {(()=>{const ca=appointments.filter(a=>a.clientId===c.id).sort((a,b)=>a.date.localeCompare(b.date));return ca.length?<div style={{marginTop:8}}>{ca.map(a=>(<div key={a.id} onClick={()=>setApptModal({...a,isNew:false})} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderTop:"1px solid #f5f6f8",cursor:"pointer"}}><div><div style={{fontSize:12,fontWeight:500}}>{a.type}</div><div style={{fontSize:11,color:"#94a3b8"}}>{a.notes}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:11,fontWeight:600,color:"#64748b"}}>{new Date(a.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div><div style={{fontSize:10,color:"#94a3b8"}}>{a.time}</div></div></div>))}</div>:null;})()}
          </Card>
        </div>

          {/* Sales */}
          <Card style={{padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:6}}><Ic t="dollar" s={14}/><span style={{fontSize:10,textTransform:"uppercase",letterSpacing:0.8,color:"#94a3b8",fontWeight:600}}>Sales</span><span style={{fontSize:10,color:"#059669",fontWeight:700}}>({(sales[c.id]||[]).length})</span></div><button onClick={()=>{const me=team[0];const sn=me.name.split(" ")[0]+" "+me.name.split(" ")[1][0]+".";setSaleModal({clientId:c.id});}} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:6,border:"1px solid #e2e5ea",background:"#fff",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151"}}><Ic t="plus" s={12}/>Add</button></div>
            {(sales[c.id]||[]).slice(0,3).map(s=>{const uSD=(field,val)=>setSales(p=>({...p,[c.id]:(p[c.id]||[]).map(x=>x.id===s.id?{...x,[field]:val}:x)}));return <div key={s.id} style={{padding:"8px 0",borderTop:"1px solid #f5f6f8"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}><input value={s.product||""} onChange={e=>uSD("product",e.target.value)} placeholder="Product..." style={{fontSize:12,fontWeight:600,border:"none",outline:"none",background:"transparent",padding:0,fontFamily:"inherit",flex:1}}/><button onClick={()=>setSales(p=>({...p,[c.id]:(p[c.id]||[]).filter(x=>x.id!==s.id)}))} style={{padding:"2px",border:"none",background:"transparent",cursor:"pointer",color:"#cbd5e1"}}><Ic t="trash" s={11}/></button></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:4}}><input value={s.quality||""} onChange={e=>uSD("quality",e.target.value)} placeholder="Quality..." style={{fontSize:10.5,border:"1px solid #eef0f2",borderRadius:4,padding:"3px 6px",outline:"none",background:"#fafbfc",fontFamily:"inherit"}}/><input value={s.saleType||""} onChange={e=>uSD("saleType",e.target.value)} placeholder="Sale type..." style={{fontSize:10.5,border:"1px solid #eef0f2",borderRadius:4,padding:"3px 6px",outline:"none",background:"#fafbfc",fontFamily:"inherit"}}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>{[["amt","Amt"],["grossProfit","Gross"],["netProfit","Net"]].map(([f,lb])=><div key={f} style={{display:"flex",alignItems:"center",border:"1px solid #eef0f2",borderRadius:4,background:"#fafbfc",overflow:"hidden"}}><span style={{fontSize:9,color:"#059669",fontWeight:700,padding:"3px 0 3px 5px"}}>$</span><input type="number" value={s[f]||""} onChange={e=>uSD(f,Number(e.target.value)||0)} placeholder={lb} style={{fontSize:10.5,fontWeight:600,color:"#059669",border:"none",outline:"none",background:"transparent",padding:"3px 4px 3px 2px",fontFamily:"inherit",width:"100%"}}/></div>)}</div></div>})}
            {!(sales[c.id]||[]).length&&<div style={{fontSize:11,color:"#cbd5e1",textAlign:"center",padding:6}}>No sales</div>}
          </Card>

        {/* RIGHT: Previous notes (clickable) → Add note → Recent calls */}
        <div>
          {/* Previous Activity — notes + calls merged, sorted most recent first */}
          {(()=>{
            const items=[
              ...clientNotes.map(n=>({type:"note",d:n.d,data:n})),
              ...clientCalls.map(c2=>({type:"call",d:c2.d,data:c2}))
            ].sort((a,b)=>b.d.localeCompare(a.d));
            const totalCount=items.length;
            const mostRecent=items[0];

            return <Card style={{marginBottom:10,overflow:"hidden"}}>
              <div onClick={()=>{if(totalCount)setNotesModal(!notesModal)}} style={{padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:totalCount?"pointer":"default",userSelect:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <Ic t="note" s={15}/>
                  <span style={{fontSize:13,fontWeight:600,color:notesModal?"#3b5bdb":"#1a1a2e",textDecoration:totalCount?"underline":"none",textUnderlineOffset:3,transition:"color 0.15s"}}>Previous Notes</span>
                  <span style={{fontSize:11,color:"#94a3b8",fontWeight:400}}>({totalCount})</span>
                </div>
                {totalCount>0&&<div style={{transform:notesModal?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s",color:"#94a3b8"}}><Ic t="chev" s={14}/></div>}
              </div>

              {/* Collapsed: most recent item preview */}
              {!notesModal&&mostRecent&&<div style={{padding:"0 18px 14px"}}>
                {mostRecent.type==="note"?<div style={{padding:"10px 14px",borderRadius:8,background:"#fafbfc",border:"1px solid #eef0f2"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:8,background:"#f0f4ff",color:"#3b5bdb"}}>Note</span><span style={{fontSize:11,fontWeight:600,color:"#3b5bdb"}}>{mostRecent.data.a}</span><span style={{fontSize:9,padding:"1px 5px",borderRadius:8,background:roleBg(mostRecent.data.aRole)+"15",color:roleBg(mostRecent.data.aRole),fontWeight:600}}>{mostRecent.data.aRole}</span><span style={{fontSize:10,color:"#94a3b8"}}>{mostRecent.data.d}</span></div>
                  <div style={{fontSize:12.5,lineHeight:1.5,color:"#374151",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{mostRecent.data.t}</div>
                </div>
                :<div style={{padding:"10px 14px",borderRadius:8,background:"#fafbfc",border:"1px solid #eef0f2",display:"flex",alignItems:"center",gap:10}}>
                  {(()=>{const ag2=team.find(m=>m.name.startsWith(mostRecent.data.ag.split(" ")[0]));return <Avatar src={ag2?.photo} fallback={ag2?.avatar||"?"} color={ag2?roleBg(ag2.role)+"30":null} size={28}/>;})()}
                  <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:8,background:mostRecent.data.ty==="Inbound"?"#f0fdf4":"#f0f4ff",color:mostRecent.data.ty==="Inbound"?"#16a34a":"#3b5bdb"}}>Call</span><span style={{fontSize:11,fontWeight:500}}>by {mostRecent.data.ag}</span><span style={{fontSize:10,color:"#94a3b8"}}>{mostRecent.data.d}</span><span style={{fontSize:10,color:"#64748b"}}>{mostRecent.data.dur}</span></div></div>
                  {mostRecent.data.rc&&<button onClick={e=>{e.stopPropagation();setPlayingCall(playingCall===mostRecent.data.id?null:mostRecent.data.id)}} style={{display:"flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:5,border:"1px solid #e2e5ea",background:"#fff",fontSize:10,cursor:"pointer",fontFamily:"inherit",color:"#64748b"}}><Ic t="play" s={10}/>Play</button>}
                </div>}
                {totalCount>1&&<div style={{fontSize:10,color:"#94a3b8",marginTop:6}}>+ {totalCount-1} more</div>}
              </div>}
              {!totalCount&&<div style={{padding:"0 18px 14px",fontSize:12,color:"#94a3b8"}}>No activity yet.</div>}

              {/* Expanded: full timeline sorted most recent first, scrollable */}
              {notesModal&&totalCount>0&&<div style={{maxHeight:380,overflowY:"auto",borderTop:"1px solid #eef0f2"}}>
                {items.map((item,i)=>{
                  if(item.type==="note"){
                    const n=item.data;const ce=canEditDeleteNote(role,n.aRole);
                    return <div key={"n"+n.id} style={{padding:"12px 18px",borderBottom:"1px solid #f5f6f8",borderLeft:"3px solid #3b5bdb"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:8,background:"#f0f4ff",color:"#3b5bdb"}}>Note</span>
                          <span style={{fontSize:11,fontWeight:600,color:"#3b5bdb"}}>{n.a}</span>
                          <span style={{fontSize:9,padding:"1px 5px",borderRadius:8,background:roleBg(n.aRole)+"15",color:roleBg(n.aRole),fontWeight:600}}>{n.aRole}</span>
                          <span style={{fontSize:10,color:"#94a3b8"}}>{n.d}</span>
                        </div>
                        {ce&&<div style={{display:"flex",gap:4}}>
                          <button style={{padding:"1px 5px",borderRadius:3,border:"1px solid #e2e5ea",background:"#fff",fontSize:9,cursor:"pointer",color:"#64748b"}}><Ic t="edit" s={9}/></button>
                          <button style={{padding:"1px 5px",borderRadius:3,border:"1px solid #fecaca",background:"#fff",fontSize:9,cursor:"pointer",color:"#ef4444"}}><Ic t="trash" s={9}/></button>
                        </div>}
                      </div>
                      <div style={{fontSize:13,lineHeight:1.5,color:"#374151",paddingLeft:2}}>{n.t}</div>
                    </div>;
                  } else {
                    const call=item.data;
                    const ag=team.find(m=>m.name.startsWith(call.ag.split(" ")[0]));
                    const isPlaying=playingCall===call.id;
                    return <div key={"c"+call.id} style={{padding:"12px 18px",borderBottom:"1px solid #f5f6f8",borderLeft:"3px solid "+(call.ty==="Inbound"?"#16a34a":"#3b5bdb")}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <Avatar src={ag?.photo} fallback={ag?.avatar||"?"} color={ag?roleBg(ag.role)+"30":null} size={30}/>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:8,background:call.ty==="Inbound"?"#f0fdf4":"#f0f4ff",color:call.ty==="Inbound"?"#16a34a":"#3b5bdb"}}>{call.ty} Call</span>
                            <span style={{fontWeight:500,fontSize:11}}>by {call.ag}</span>
                            {ag&&<span style={{fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:8,background:roleBg(ag.role)+"15",color:roleBg(ag.role)}}>{ag.role}</span>}
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}><span style={{fontSize:10,color:"#94a3b8"}}>{call.d}</span><span style={{fontSize:10,color:"#64748b"}}>{call.dur}</span>{!call.rc&&<span style={{fontSize:9,color:"#cbd5e1"}}>No recording</span>}</div>
                        </div>
                        {call.rc&&<button onClick={e=>{e.stopPropagation();setPlayingCall(isPlaying?null:call.id)}} style={{display:"flex",alignItems:"center",gap:3,padding:"4px 10px",borderRadius:6,border:isPlaying?"1px solid #059669":"1px solid #e2e5ea",background:isPlaying?"#f0fdf4":"#fff",fontSize:10,cursor:"pointer",fontFamily:"inherit",color:isPlaying?"#059669":"#64748b",fontWeight:isPlaying?600:400}}><Ic t="play" s={11}/>{isPlaying?"Playing...":"Play"}</button>}
                      </div>
                      {isPlaying&&<div style={{marginTop:8,padding:"8px 12px",background:"#f0fdf4",borderRadius:8,display:"flex",alignItems:"center",gap:8}}>
                        <div style={{flex:1,height:4,background:"#d1fae5",borderRadius:2,overflow:"hidden"}}><div style={{width:"45%",height:"100%",background:"#059669",borderRadius:2,animation:"grow 3s linear infinite"}}/></div>
                        <span style={{fontSize:10,color:"#059669",fontWeight:500}}>{call.dur}</span>
                        <button onClick={()=>setPlayingCall(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#059669",padding:0}}><Ic t="x" s={12}/></button>
                      </div>}
                    </div>;
                  }
                })}
              </div>}
            </Card>;
          })()}

          {/* Add note */}
          <Card style={{padding:"14px 18px",marginBottom:14}}>
            <div style={{display:"flex",gap:10}}>
              <textarea placeholder="Add a note..." value={note} onChange={e=>setNote(e.target.value)} rows={2} style={{flex:1,border:"1px solid #e2e5ea",borderRadius:8,padding:"9px 12px",fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box"}}/>
              <button onClick={()=>{if(!note.trim())return;setNts(p=>({...p,[c.id]:[{id:Date.now(),d:new Date().toISOString().slice(0,10),a:team[0].name.split(" ")[0]+" "+team[0].name.split(" ")[1][0]+".",aRole:role,t:note.trim()},...(p[c.id]||[])]}));setNote("");}} style={{padding:"0 16px",borderRadius:8,border:"none",background:"#1a1a2e",color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",alignSelf:"stretch"}}>Save</button>
            </div>
          </Card>

          {/* Recent Calls */}
          <Card style={{overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:"1px solid #eef0f2",fontSize:13,fontWeight:600,display:"flex",justifyContent:"space-between"}}><span>Recent Calls</span><span style={{fontSize:11,color:"#94a3b8",fontWeight:400}}>{clientCalls.length} call{clientCalls.length!==1?"s":""}</span></div>
            <div style={{maxHeight:240,overflowY:"auto"}}>
              {!clientCalls.length&&<div style={{textAlign:"center",padding:24,color:"#94a3b8",fontSize:13}}>No calls recorded.</div>}
              {clientCalls.map((call,idx)=>{
                const ag=team.find(m=>m.name.startsWith(call.ag.split(" ")[0]));
                const isP=playingCall===call.id;
                return <div key={"rc"+idx} style={{padding:"12px 18px",borderBottom:"1px solid #f5f6f8"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <Avatar src={ag?.photo} fallback={ag?.avatar||"?"} color={ag?roleBg(ag.role)+"30":null} size={30}/>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:500,fontSize:12}}>Called by {call.ag}</span>{ag&&<span style={{fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:8,background:roleBg(ag.role)+"15",color:roleBg(ag.role)}}>{ag.role}</span>}</div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}><span style={{fontSize:11,color:"#94a3b8"}}>{call.d}</span><span style={{fontSize:10,fontWeight:600,padding:"1px 6px",borderRadius:8,background:call.ty==="Inbound"?"#f0fdf4":"#f0f4ff",color:call.ty==="Inbound"?"#16a34a":"#3b5bdb"}}>{call.ty}</span><span style={{fontSize:11,color:"#64748b"}}>{call.dur}</span></div>
                    </div>
                    {call.rc&&<button onClick={()=>setPlayingCall(isP?null:call.id)} style={{display:"flex",alignItems:"center",gap:3,padding:"4px 10px",borderRadius:6,border:isP?"1px solid #059669":"1px solid #e2e5ea",background:isP?"#f0fdf4":"#fff",fontSize:10,cursor:"pointer",fontFamily:"inherit",color:isP?"#059669":"#64748b",fontWeight:isP?600:400}}><Ic t="play" s={11}/>{isP?"Playing...":"Play"}</button>}
                  </div>
                  {isP&&<div style={{marginTop:8,padding:"8px 12px",background:"#f0fdf4",borderRadius:8,display:"flex",alignItems:"center",gap:8}}>
                    <div style={{flex:1,height:4,background:"#d1fae5",borderRadius:2,overflow:"hidden"}}><div style={{width:"45%",height:"100%",background:"#059669",borderRadius:2,animation:"grow 3s linear infinite"}}/></div>
                    <span style={{fontSize:10,color:"#059669",fontWeight:500}}>{call.dur}</span>
                    <button onClick={()=>setPlayingCall(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#059669",padding:0}}><Ic t="x" s={12}/></button>
                  </div>}
                </div>;
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>;
  };

  /* ======================== MAIN RENDER ======================== */
  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#fafbfc",color:"#1a1a2e",overflow:"hidden",opacity:on?1:0,transition:"opacity 0.5s"}}>
      {/* SIDEBAR */}
      <div style={{width:Math.round(240*textSize),background:"#fff",borderRight:"1px solid #eef0f2",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",zoom:textSize}}>
        <div style={{padding:"20px 16px 12px"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:90,height:90,minWidth:90,borderRadius:18,background:"#1a1a2e",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"75%",height:"75%",borderRadius:"50%",background:"radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",mixBlendMode:"soft-light"}}/><svg viewBox="0 0 100 100" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-45deg) scale(0.9)",opacity:0.45,width:"100%",height:"100%"}}><ellipse cx="50" cy="62" rx="26" ry="20" fill="#fff"/><ellipse cx="20" cy="44" rx="10" ry="13" fill="#fff"/><ellipse cx="40" cy="24" rx="10" ry="13" fill="#fff"/><ellipse cx="64" cy="24" rx="10" ry="13" fill="#fff"/><ellipse cx="82" cy="44" rx="10" ry="13" fill="#fff"/></svg><span style={{color:"#fff",fontWeight:800,fontSize:48,letterSpacing:1,position:"relative",zIndex:1}}>TF</span></div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:22,letterSpacing:-0.5,color:"#1a1a2e",textAlign:"center"}}>TracForce</div><div style={{fontSize:11,color:"#94a3b8",letterSpacing:1.5,textTransform:"uppercase",whiteSpace:"nowrap",textAlign:"center"}}>Client Tracking</div><div style={{display:"flex",justifyContent:"flex-start",marginTop:4}}><img src={FRENCHIE_IMG} alt="Frenchies" style={{width:110,height:"auto",opacity:0.88}} onError={(e)=>{e.target.style.display="none"}}/></div></div></div><div style={{borderBottom:"1px solid #eef0f2",marginLeft:30,marginTop:12}}/></div>
        <div style={{padding:"14px 16px 8px"}}><div style={{fontSize:9.5,textTransform:"uppercase",letterSpacing:1,color:"#94a3b8",marginBottom:5,fontWeight:600}}>Viewing as</div><select value={role} onChange={e=>setRole(e.target.value)} style={{width:"100%",padding:"7px 10px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fafbfc",fontSize:13,fontFamily:"inherit",color:"#1a1a2e",cursor:"pointer",outline:"none"}}>{ROLE_ORDER.filter(r=>r!=="Client").map(r=><option key={r}>{r}</option>)}</select></div>
        <nav style={{padding:"8px 12px",flex:1}}>
          {[["dashboard","Dashboard","home"],["team","Team","team"],["clients","Clients","users"],["engagement","Engagement","activity"],["kpi","KPI","signal"],["acquisition","Acquisition","target"],["settings","Settings","gear"]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>navTo(k)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",background:(sec===k&&!dialClient)?"#f0f2f5":"transparent",color:(sec===k&&!dialClient)?"#1a1a2e":"#64748b",fontWeight:(sec===k&&!dialClient)?600:400,fontSize:13.5,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",marginBottom:2}}><Ic t={ic} s={17}/>{l}</button>
          ))}
        </nav>
        {(role==="Master"||role==="Admin")&&<div style={{padding:"0 12px 8px"}}><div style={{fontSize:9.5,textTransform:"uppercase",letterSpacing:1,color:"#94a3b8",padding:"8px 12px 4px",fontWeight:600}}>{role==="Master"?"Master Only":"Admin"}</div>{[["audit","Audit Logs","log"],...(role==="Master"?[["billing","Billing","dollar"]]:[])].map(([k,l,ic])=>(<button key={k} onClick={()=>navTo(k)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:"none",background:sec===k?"#f0f2f5":"transparent",color:sec===k?"#1a1a2e":"#64748b",fontWeight:sec===k?600:400,fontSize:13.5,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",marginBottom:2}}><Ic t={ic} s={17}/>{l}</button>))}</div>}
        <div style={{padding:"16px 20px",borderTop:"1px solid #eef0f2",fontSize:11,color:"#94a3b8"}}>TracForce v1.0</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",zoom:textSize}}>
        <div style={{height:58,background:"#fff",borderBottom:"1px solid #eef0f2",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 14px",background:"#f5f6f8",borderRadius:8,width:280}}><Ic t="search" s={15}/><input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} style={{border:"none",background:"transparent",outline:"none",fontSize:13,fontFamily:"inherit",color:"#1a1a2e",width:"100%"}}/></div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {dialActive&&<div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",background:"#05966818",borderRadius:20,fontSize:11.5,fontWeight:600,color:"#059669"}}><span style={{width:6,height:6,borderRadius:"50%",background:"#059669"}}/> {fmtSec(dialTimer)}</div>}
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",background:roleBg(role)+"18",borderRadius:20,fontSize:11.5,fontWeight:600,color:roleBg(role)}}><Ic t="key" s={13}/>{role}</div>
            <div style={{position:"relative"}}><div onClick={()=>setAcctDrop(!acctDrop)} style={{width:32,height:32,borderRadius:"50%",background:roleBg(role),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",border:acctDrop?"2px solid "+roleBg(role):"2px solid transparent",boxShadow:acctDrop?"0 0 0 3px "+roleBg(role)+"30":"none",transition:"all 0.15s"}}>{(team.find(m=>m.role===role)?.name||"SM").split(" ").map(w=>w[0]).join("").slice(0,2)}</div>{acctDrop&&<div style={{position:"absolute",top:"calc(100% + 8px)",right:0,width:240,background:"#fff",borderRadius:12,border:"1px solid #eef0f2",boxShadow:"0 12px 32px rgba(0,0,0,0.12)",zIndex:999,overflow:"hidden"}}><div style={{padding:"12px 14px",borderBottom:"1px solid #eef0f2",fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1}}>Switch Account</div>{team.filter(m=>m.role!=="Client").map(m=>{const active=m.role===role;return <div key={m.id} onClick={()=>{setRole(m.role);setAcctDrop(false);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",background:active?roleBg(m.role)+"10":"transparent",borderLeft:active?"3px solid "+roleBg(m.role):"3px solid transparent",transition:"all 0.1s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="#fafbfc"}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent"}}><div style={{width:28,height:28,borderRadius:"50%",background:roleBg(m.role)+"20",display:"flex",alignItems:"center",justifyContent:"center",color:roleBg(m.role),fontSize:10,fontWeight:700,border:active?"2px solid "+roleBg(m.role):"2px solid transparent"}}>{m.name.split(" ").map(w=>w[0]).join("")}</div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:active?700:500,color:active?"#1a1a2e":"#374151"}}>{m.name}</div><div style={{fontSize:10,color:roleBg(m.role),fontWeight:600}}>{m.role}</div></div>{active&&<div style={{width:6,height:6,borderRadius:"50%",background:roleBg(m.role)}}/> }</div>})}</div>}</div>
          </div>
        </div>

        <div style={{flex:1,overflow:"auto",padding:28}}>
          {dialClient&&<DialPage/>}

          {/* DASHBOARD */}
          {!dialClient&&sec==="dashboard"&&<div>
            <div style={{marginBottom:24}}><h1 style={{fontSize:24,fontWeight:700,margin:0,letterSpacing:-0.5}}>Dashboard</h1><p style={{color:"#94a3b8",fontSize:14,margin:"4px 0 0"}}>Overview of your client activity.</p></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
              {[["Total Clients",String(clients.length),"+2 this month","#3b5bdb"],["Active",String(clients.filter(c=>c.st==="Active").length),"of total","#22c55e"],["Hot Leads",String(clients.filter(c=>c.lead==="Hot").length),"high priority","#ef4444"],["Team",String(team.length),ROLE_ORDER.filter(r=>r!=="Client"&&team.some(m=>m.role===r)).length+" roles","#8b5cf6"]].map(([l,v,s,a],i)=>(
                <Card key={i} onClick={l==="Total Clients"?()=>navTo("clients"):undefined} style={{padding:"20px 22px",position:"relative",overflow:"hidden",cursor:l==="Total Clients"?"pointer":"default"}}><div style={{position:"absolute",top:0,left:0,width:"100%",height:3,background:a}}/><div style={{fontSize:11.5,color:"#94a3b8",fontWeight:500,textTransform:"uppercase",letterSpacing:0.5}}>{l}</div><div style={{fontSize:28,fontWeight:700,margin:"6px 0 2px",letterSpacing:-1}}>{v}</div><div style={{fontSize:12,color:"#64748b"}}>{s}</div></Card>
              ))}
            </div>
            <Card style={{overflow:"hidden"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #eef0f2"}}><div style={{display:"flex",alignItems:"center"}}>
              {[["appointments","Upcoming Appointments","clock"],["recent","Recent Clients","activity"]].map(([k,l,ic])=>(<button key={k} onClick={()=>setDashTab(k)} style={{display:"flex",alignItems:"center",gap:7,padding:"13px 22px",fontSize:13.5,fontWeight:dashTab===k?600:400,color:dashTab===k?"#1a1a2e":"#94a3b8",background:"transparent",border:"none",borderBottom:dashTab===k?"2px solid #1a1a2e":"2px solid transparent",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}><Ic t={ic} s={14}/>{l}</button>))}
            </div>{dashTab==="appointments"&&<button onClick={()=>openNewAppt(null)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:8,border:"none",background:"#3b5bdb",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",marginRight:16,fontFamily:"inherit",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#2b4bc6"} onMouseLeave={e=>e.currentTarget.style.background="#3b5bdb"}><Ic t="plus" s={14}/>New</button>}</div>
              {dashTab==="appointments"&&(()=>{const upcoming=appointments.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));const apptTypeColor=t=>t==="Follow-up Call"?"#3b5bdb":t==="Product Demo"?"#7c3aed":t==="Onboarding"?"#059669":t==="Quarterly Review"?"#f59e0b":"#64748b";const apptTypeBg=t=>t==="Follow-up Call"?"#f0f4ff":t==="Product Demo"?"#f5f3ff":t==="Onboarding"?"#f0fdf4":t==="Quarterly Review"?"#fffbeb":"#f8fafc";const today=new Date();const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;const todayStr=fmt(today);const tomorrowStr=fmt(new Date(today.getTime()+86400000));const dayLabel=d=>d===todayStr?"Today":d===tomorrowStr?"Tomorrow":new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});return !upcoming.length?<div style={{textAlign:"center",padding:36,color:"#94a3b8",fontSize:13}}>No upcoming appointments.</div>:upcoming.map(apt=>{const c=clients.find(x=>x.id===apt.clientId);return c?<div key={apt.id} onClick={()=>{setSel(c);setSec("clients");setTab("info")}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 22px",borderBottom:"1px solid #f5f6f8",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:40,height:40,borderRadius:10,background:apptTypeBg(apt.type),display:"flex",alignItems:"center",justifyContent:"center",color:apptTypeColor(apt.type)}}><Ic t={apt.type==="Follow-up Call"?"phone":apt.type==="Product Demo"?"target":apt.type==="Onboarding"?"users":"activity"} s={17}/></div><div><div style={{fontWeight:500,fontSize:13.5}}>{c.name} <span style={{fontWeight:400,color:"#94a3b8",fontSize:12}}>— {apt.type}</span></div><div style={{fontSize:11.5,color:"#94a3b8"}}>{apt.notes}</div></div></div><div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}><div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:600,color:apt.date===todayStr?"#059669":apt.date===tomorrowStr?"#f59e0b":"#64748b"}}>{dayLabel(apt.date)}</div><div style={{fontSize:11,color:"#94a3b8"}}>{apt.time}</div></div><Ic t="chev" s={14}/></div></div>:null;});})()}
              {dashTab==="recent"&&(()=>{const withLastActivity=clients.map(c=>{const cNotes=(nts[c.id]||[]).map(n=>n.d);const cCalls=(cls[c.id]||[]).map(cl=>cl.d);const allDates=[c.lc,...cNotes,...cCalls].filter(Boolean);allDates.sort((a,b)=>b.localeCompare(a));return{...c,_lastActivity:allDates[0]||c.lc};});withLastActivity.sort((a,b)=>b._lastActivity.localeCompare(a._lastActivity));return withLastActivity.slice(0,4).map(c=>(<div key={c.id} onClick={()=>{setSel(c);setSec("clients");setTab("info")}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 22px",borderBottom:"1px solid #f5f6f8",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{display:"flex",alignItems:"center",gap:12}}><Avatar src={c.photo} fallback={ini(c.name)} size={34}/><div><div style={{fontWeight:500,fontSize:13.5}}>{c.name}</div><div style={{fontSize:11.5,color:"#94a3b8"}}>{c.co}</div></div></div><div style={{display:"flex",alignItems:"center",gap:10}}><LeadBadge lead={c.lead}/><span style={{width:7,height:7,borderRadius:"50%",background:stColor(c.st)}}/><span style={{fontSize:12,color:"#94a3b8"}}>{c._lastActivity}</span><Ic t="chev" s={14}/></div></div>))})()}
            </Card>
          </div>}

          {/* ENGAGEMENT */}
          {!dialClient&&sec==="engagement"&&<EngagementSection clients={clients} nts={nts} cls={cls} sales={sales} team={team} Card={Card} Avatar={Avatar} setSel={setSel} setSec={setSec} setTab={setTab}/>}

          {/* TEAM */}
          {!dialClient&&sec==="team"&&!selMember&&!viewPosts&&<div>
            <h1 style={{fontSize:22,fontWeight:700,margin:"0 0 18px",letterSpacing:-0.5}}>Team</h1>
            <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>{ROLE_ORDER.filter(r=>r!=="Client").map(r=><div key={r} style={{padding:"8px 16px",borderRadius:10,background:"#fff",border:"1px solid #eef0f2",display:"flex",alignItems:"center",gap:8}}><span style={{width:8,height:8,borderRadius:"50%",background:roleBg(r)}}/><span style={{fontSize:13,fontWeight:500}}>{r}</span><span style={{fontSize:12,color:"#94a3b8",fontWeight:600}}>{team.filter(m=>m.role===r).length}</span></div>)}</div>
            <Card style={{overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr"+(canAssignKeys(role)?" 90px":""),padding:"11px 22px",borderBottom:"1px solid #eef0f2",fontSize:10.5,textTransform:"uppercase",letterSpacing:0.8,color:"#94a3b8",fontWeight:600}}><span>Member</span><span>Role</span><span>Phone Time</span><span>Notes</span><span>Calls</span>{canAssignKeys(role)&&<span>Actions</span>}</div>
              {team.map(m=>(<div key={m.id} onClick={()=>setSelMember(m)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr"+(canAssignKeys(role)?" 90px":""),padding:"13px 22px",borderBottom:"1px solid #f5f6f8",alignItems:"center",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar src={m.photo} fallback={m.avatar} color={roleBg(m.role)+"30"} size={34}/><div><div style={{fontWeight:500,fontSize:13}}>{m.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{m.email}</div></div></div>
                <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:roleBg(m.role)+"15",color:roleBg(m.role),width:"fit-content"}}>{m.role}</span>
                <span style={{fontSize:13,color:"#64748b"}}>{m.phoneTime}h</span>
                <span style={{fontSize:13,color:"#64748b"}}>{m.noteCount}</span>
                <span style={{fontSize:13,color:"#64748b"}}>{m.callCount}</span>
                {canAssignKeys(role)&&<div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
                  {isAbove(role,m.role)&&<button onClick={()=>setAssignModal(m)} style={{padding:"4px 8px",borderRadius:6,border:"1px solid #e2e5ea",background:"#fff",fontSize:10,cursor:"pointer",fontFamily:"inherit",color:"#64748b"}}><Ic t="key" s={12}/></button>}
                  {canDeleteBelow(role,m.role)&&isAbove(role,m.role)&&<button style={{padding:"4px 8px",borderRadius:6,border:"1px solid #fecaca",background:"#fff",fontSize:10,cursor:"pointer",fontFamily:"inherit",color:"#ef4444"}}><Ic t="trash" s={12}/></button>}
                </div>}
              </div>))}
            </Card>
          </div>}

          {/* MEMBER PROFILE */}
          {!dialClient&&sec==="team"&&selMember&&!viewPosts&&<div>
            <Back label="Back to Team" onClick={()=>setSelMember(null)}/>
            <Card style={{padding:28,marginBottom:20}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:18}}><PhotoAvatar src={selMember.photo} fallback={selMember.avatar} color={roleBg(selMember.role)} size={72} onClick={()=>handlePhoto(selMember.id,false)}/><div><h2 style={{margin:0,fontSize:22,fontWeight:700}}>{selMember.name}</h2><div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}><span style={{fontSize:11,fontWeight:600,padding:"3px 12px",borderRadius:20,background:roleBg(selMember.role)+"15",color:roleBg(selMember.role)}}>{selMember.role}</span><span style={{fontSize:13,color:"#94a3b8"}}>{selMember.email}</span></div><div style={{fontSize:12,color:"#94a3b8",marginTop:4}}>Last active: <span style={{fontWeight:500,color:"#64748b"}}>{selMember.lastActive}</span></div></div></div>{canAssignKeys(role)&&isAbove(role,selMember.role)&&<button onClick={()=>setAssignModal(selMember)} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#1a1a2e"}}><Ic t="key" s={15}/>Change Role</button>}</div></Card>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}><Stat label="Phone Time" val={selMember.phoneTime+"h"} icon="clock" color="#3b5bdb"/><Stat label="Notes" val={String(selMember.noteCount)} icon="note" color="#059669"/><Stat label="Calls" val={String(selMember.callCount)} icon="phone" color="#f59e0b"/><Stat label="Posts" val={String((posts[selMember.id]||[]).length)} icon="post" color="#8b5cf6"/></div>
            <Card style={{padding:"22px 26px",marginBottom:20}}><h3 style={{fontSize:15,fontWeight:600,margin:"0 0 14px"}}>Profile Information</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px 36px"}}>{[["Full Name",selMember.name],["Email",selMember.email],["Phone",selMember.phone],["Role",selMember.role],["Joined",selMember.joined],["Last Active",selMember.lastActive]].map(([l,v],i)=>(<div key={i}><div style={{fontSize:10.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600,marginBottom:3}}>{l}</div><div style={{fontSize:14,fontWeight:500}}>{v}</div></div>))}</div></Card>
            {(()=>{const ml=clients.filter(c=>c.assignedTo===selMember.id);return <Card style={{padding:"22px 26px",marginBottom:20}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{fontSize:15,fontWeight:600,margin:0}}>Assigned Leads <span style={{fontSize:12,fontWeight:400,color:"#94a3b8"}}>({ml.length})</span></h3></div>{!ml.length&&<div style={{textAlign:"center",padding:20,color:"#94a3b8",fontSize:13}}>No leads assigned.</div>}{ml.map(c=><div key={c.id} onClick={()=>{setSec("clients");setSel(c);setTab("info");setSelMember(null)}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:10,border:"1px solid #eef0f2",marginBottom:6,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{display:"flex",alignItems:"center",gap:10}}><Avatar src={c.photo} fallback={ini(c.name)} size={28}/><div><div style={{fontWeight:500,fontSize:13}}>{c.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{c.co}</div></div></div><div style={{display:"flex",alignItems:"center",gap:8}}><LeadBadge lead={c.lead}/><span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:tBg(c.ti),color:tC(c.ti)}}>{c.ti}</span><Ic t="chev" s={12}/></div></div>)}</Card>;})()}
            <Card style={{padding:"22px 26px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{fontSize:15,fontWeight:600,margin:0}}>Posts</h3>{(posts[selMember.id]||[]).length>1&&<button onClick={()=>setViewPosts(selMember.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#3b5bdb"}}>View All <Ic t="chev" s={12}/></button>}</div><div style={{display:"flex",gap:10,marginBottom:16}}><input value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Write a post..." onKeyDown={e=>e.key==="Enter"&&addPost(selMember.id)} style={{flex:1,border:"1px solid #e2e5ea",borderRadius:8,padding:"9px 14px",fontSize:13,fontFamily:"inherit",outline:"none"}}/><button onClick={()=>addPost(selMember.id)} style={{padding:"9px 16px",borderRadius:8,border:"none",background:"#1a1a2e",color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Post</button></div>
              {!(posts[selMember.id]||[]).length&&<div style={{textAlign:"center",padding:20,color:"#94a3b8",fontSize:13}}>No posts yet.</div>}
              {(posts[selMember.id]||[]).slice(0,1).map(p=>(<div key={p.id} style={{padding:"14px 16px",borderRadius:10,background:"#fafbfc",border:"1px solid #eef0f2"}}><div style={{fontSize:11,color:"#94a3b8",marginBottom:6,fontFamily:"monospace"}}>{p.date}</div><div style={{fontSize:13.5,lineHeight:1.6,color:"#374151"}}>{p.text}</div></div>))}
            </Card>
          </div>}

          {/* POST HISTORY */}
          {!dialClient&&sec==="team"&&viewPosts&&(()=>{const m=team.find(x=>x.id===viewPosts);const mp=posts[viewPosts]||[];return <div><Back label={"Back to "+m.name} onClick={()=>setViewPosts(null)}/><div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}><Avatar src={m.photo} fallback={m.avatar} color={roleBg(m.role)+"30"} size={40}/><div><h1 style={{fontSize:20,fontWeight:700,margin:0}}>{m.name}'s Posts</h1><div style={{fontSize:13,color:"#94a3b8"}}>{mp.length} post{mp.length!==1?"s":""}</div></div></div><div style={{display:"flex",gap:10,marginBottom:20}}><input value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Write a new post..." onKeyDown={e=>e.key==="Enter"&&addPost(viewPosts)} style={{flex:1,border:"1px solid #e2e5ea",borderRadius:8,padding:"9px 14px",fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff"}}/><button onClick={()=>addPost(viewPosts)} style={{padding:"9px 16px",borderRadius:8,border:"none",background:"#1a1a2e",color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Post</button></div>{mp.map(p=>(<Card key={p.id} style={{padding:"18px 22px",marginBottom:10}}><div style={{fontSize:11,color:"#94a3b8",marginBottom:8,fontFamily:"monospace"}}>{p.date}</div><div style={{fontSize:14,lineHeight:1.6,color:"#374151"}}>{p.text}</div></Card>))}{!mp.length&&<div style={{textAlign:"center",padding:40,color:"#94a3b8",fontSize:14}}>No posts yet.</div>}</div>})()}

          {/* CLIENTS LIST with Lead Group Filter + Import + Add */}
          {!dialClient&&sec==="kpi"&&(()=>{
            const now2=new Date(2026,1,25);
            const rangeD={"1d":1,"7d":7,"1m":30,"3m":90,"6m":180,"12m":365,"custom":0,"all":9999}[kpiRange]||30;
            const kpiStart=kpiRange==="custom"?(parseD(kpiFrom)||new Date(2020,0,1)):new Date(now2);if(kpiRange!=="custom")kpiStart.setDate(kpiStart.getDate()-rangeD);
            const kpiStartStr=kpiStart.toISOString().slice(0,10);
            const kpiEndStr=kpiRange==="custom"?kpiTo:"2026-02-25";
            const agents=team.filter(m=>m.role!=="Client");
            const getKpi=(member)=>{
              const sn=member.name.split(" ")[0]+" "+member.name.split(" ")[1][0]+".";
              let totalCalls=0,totalMins=0,inbound=0,outbound=0,reached=0;
              Object.values(cls).forEach(arr=>arr.forEach(c=>{if(c.ag===sn&&c.d>=kpiStartStr&&c.d<=kpiEndStr){totalCalls++;const pts=c.dur.split(":");totalMins+=parseInt(pts[0]||0)+(parseInt(pts[1]||0)/60);if(c.ty==="Inbound")inbound++;else outbound++;if(c.rc)reached++;}}));
              let totalNotes=0;Object.values(nts).forEach(arr=>arr.forEach(n=>{if(n.a===sn&&n.d>=kpiStartStr&&n.d<=kpiEndStr)totalNotes++;}));
              let totalSales=0,totalRev=0;Object.values(sales).forEach(arr=>arr.forEach(s=>{if(s.ag===sn&&s.d>=kpiStartStr&&s.d<=kpiEndStr){totalSales++;totalRev+=s.amt;}}));
              const assignedClients=clients.filter(c=>c.assignedTo===member.id).length;
              const reachRate=totalCalls>0?Math.round(reached/totalCalls*100):0;
              return{totalCalls,totalMins:Math.round(totalMins*10)/10,inbound,outbound,reached,reachRate,totalNotes,totalSales,totalRev,assignedClients};
            };
            const teamKpi=agents.map(m=>({...m,kpi:getKpi(m)}));
            const totals={calls:teamKpi.reduce((s,m)=>s+m.kpi.totalCalls,0),mins:Math.round(teamKpi.reduce((s,m)=>s+m.kpi.totalMins,0)*10)/10,notes:teamKpi.reduce((s,m)=>s+m.kpi.totalNotes,0),sales:teamKpi.reduce((s,m)=>s+m.kpi.totalSales,0),rev:teamKpi.reduce((s,m)=>s+m.kpi.totalRev,0),reached:teamKpi.reduce((s,m)=>s+m.kpi.reached,0)};
            const reachRate=totals.calls>0?Math.round(totals.reached/totals.calls*100):0;
