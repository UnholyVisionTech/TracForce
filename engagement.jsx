   §6 — ENGAGEMENT SECTION COMPONENT
   Standalone: EngagementSection.jsx
   Depends on: React, §2, §4, §5
   ══════════════════════════════════════════════════════════ */
const EngagementSection=({clients,nts,cls,sales,team,Card,Avatar,setSel,setSec,setTab})=>{
  const [lbRange,setLbRange]=useState("all");
  const [lbDropOpen,setLbDropOpen]=useState(false);
  const [customFrom,setCustomFrom]=useState("2026-01-01");
  const [customTo,setCustomTo]=useState("2026-02-25");
  const [showCustom,setShowCustom]=useState(false);
  const [graphMode,setGraphMode]=useState("all");
  const dropBtnRef=useRef(null);
  const [dropPos,setDropPos]=useState({top:0,left:0});

  const TC={call:"#3b5bdb",note:"#7c3aed",email:"#0891b2",sale:"#059669"};
  const TBG={call:"#f0f4ff",note:"#f5f0ff",email:"#f0fafe",sale:"#f0fdf4"};
  const TIC={call:"phone",note:"note",email:"email",sale:"dollar"};

  // Date filter helper
  const now=new Date(2026,1,25);
  const rangeStart=(r)=>{
    if(r==="1d")return new Date(now.getTime()-1*864e5);
    if(r==="5d")return new Date(now.getTime()-5*864e5);
    if(r==="15d")return new Date(now.getTime()-15*864e5);
    if(r==="1m")return new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
    if(r==="3m")return new Date(now.getFullYear(),now.getMonth()-3,now.getDate());
    if(r==="6m")return new Date(now.getFullYear(),now.getMonth()-6,now.getDate());
    if(r==="1y")return new Date(now.getFullYear()-1,now.getMonth(),now.getDate());
    if(r==="5y")return new Date(now.getFullYear()-5,now.getMonth(),now.getDate());
    if(r==="custom")return parseD(customFrom)||new Date(2020,0,1);
    return new Date(2020,0,1);
  };
  const rangeEnd=(r)=>r==="custom"?(parseD(customTo)||now):now;
  const inRange=(dateStr)=>{const d=new Date(dateStr);return d>=rangeStart(lbRange)&&d<=rangeEnd(lbRange);};

  // Agent engagement filtered by date range
  const agentEng=team.filter(t=>t.role!=="Client").map(t=>{
    const sn=t.name.split(" ")[0]+" "+t.name.split(" ")[1][0]+".";
    let ac=0,an=0,as=0;
    Object.values(cls).forEach(arr=>arr.forEach(c=>{if(c.ag===sn&&inRange(c.d))ac++;}));
    Object.values(nts).forEach(arr=>arr.forEach(n=>{if(n.a===sn&&inRange(n.d))an++;}));
    Object.values(sales).forEach(arr=>arr.forEach(s=>{if(s.ag===sn&&inRange(s.d))as++;}));
    const ae=Math.max(0,Math.floor((ac+an)*0.6));
    return {...t,ac,an,ae,as,total:ac+an+ae+as};
  }).sort((a,b)=>b.total-a.total);

  // Client + totals use all-time (no filter)
  const clientEng=clients.map(c=>{
    const cn=(nts[c.id]||[]).length;const cc=(cls[c.id]||[]).length;const cs=(sales[c.id]||[]).length;const ce=Math.max(1,Math.floor((cn+cc)*0.7));
    return {...c,cn,cc,cs,ce,total:cn+cc+cs+ce,trend:(cn+cc+cs+ce)>4?"up":"down"};
  }).sort((a,b)=>b.total-a.total);
  const totC=Object.values(cls).reduce((s,a)=>s+a.length,0);
  const totN=Object.values(nts).reduce((s,a)=>s+a.length,0);
  const totS=Object.values(sales).reduce((s,a)=>s+a.length,0);
  const totSAmt=Object.values(sales).reduce((s,a)=>s+a.reduce((ss,x)=>ss+x.amt,0),0);
  const totE=Math.max(1,Math.floor((totC+totN)*0.65));
  const totAll=totC+totN+totE+totS;
  const recent=[];
  Object.entries(nts).forEach(([cid,arr])=>arr.forEach(n=>{const cl=clients.find(x=>x.id===Number(cid));if(cl)recent.push({id:"n"+cid+n.id,type:"note",agent:n.a,client:cl.name,date:n.d,summary:n.t.slice(0,55)+(n.t.length>55?"...":"")});}));
  Object.entries(cls).forEach(([cid,arr])=>arr.forEach(c=>{const cl=clients.find(x=>x.id===Number(cid));if(cl)recent.push({id:"c"+cid+c.id,type:"call",agent:c.ag,client:cl.name,date:c.d,summary:`${c.dur} ${c.ty.toLowerCase()} call`});}));
  Object.entries(sales).forEach(([cid,arr])=>arr.forEach(s=>{const cl=clients.find(x=>x.id===Number(cid));if(cl)recent.push({id:"s"+cid+s.id,type:"sale",agent:s.ag,client:cl.name,date:s.d,summary:`$${s.amt.toLocaleString()} — ${s.product}`});}));
  recent.sort((a,b)=>b.date.localeCompare(a.date));
  const spark=(base,len=7)=>Array.from({length:len},(_,i)=>Math.max(1,Math.round(base*(0.7+Math.sin(i)*0.3))));
  const MiniBar=({data,color})=>{const mx=Math.max(...data,1);return <div style={{display:"flex",alignItems:"flex-end",gap:2,height:32}}>{data.map((v,i)=><div key={i} style={{width:4,height:Math.max(2,(v/mx)*32),background:color,borderRadius:2,opacity:i>=data.length-3?1:0.4}}/>)}</div>;};

  const curLabel=RANGE_OPTS.find(r=>r.k===lbRange)?.l||"All Time";

  return <div>
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg, #3b5bdb 0%, #7c3aed 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><Ic t="activity" s={16}/></div>
        <h1 style={{fontSize:22,fontWeight:700,margin:0,letterSpacing:-0.3}}>Engagement</h1>
      </div>
      <p style={{color:"#94a3b8",fontSize:13,margin:"0 0 0 42"}}>Client interaction metrics across calls, notes & emails</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[["Total Interactions",totAll,"signal","#1a1a2e",spark(Math.round(totAll/7))],["Calls",totC,"phone",TC.call,spark(Math.round(totC/7))],["Notes",totN,"note",TC.note,spark(Math.round(totN/7))],["Sales",totS,"dollar",TC.sale,spark(Math.max(1,Math.round(totS/7)))],["Emails",totE,"email",TC.email,spark(Math.round(totE/7))]].map(([label,val,icon,color,data])=>(
        <Card key={label} style={{padding:"18px 20px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,width:"100%",height:3,background:color}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6,color:"#94a3b8"}}><Ic t={icon} s={13}/><span style={{fontSize:10.5,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>{label}</span></div>
              <div style={{fontSize:26,fontWeight:700,letterSpacing:-0.5}}>{val}</div>
            </div>
            <MiniBar data={data} color={color}/>
          </div>
        </Card>
      ))}
    </div>
    {/* ── Activity Over Time graph ── */}
    {(()=>{
      const allDates=[];
      Object.values(nts).forEach(arr=>arr.forEach(n=>{if(inRange(n.d))allDates.push({d:n.d,type:"note"});}));
      Object.values(cls).forEach(arr=>arr.forEach(c=>{if(inRange(c.d))allDates.push({d:c.d,type:"call"});}));
      Object.values(sales).forEach(arr=>arr.forEach(s=>{if(inRange(s.d))allDates.push({d:s.d,type:"sale"});}));
      if(allDates.length<2)return <Card style={{marginBottom:20,padding:"24px 20px"}}><div style={{textAlign:"center",color:"#94a3b8",fontSize:13}}>Not enough data for selected range</div></Card>;
      allDates.sort((a,b)=>a.d.localeCompare(b.d));
      const minD=allDates[0].d,maxD=allDates[allDates.length-1].d;
      const diffDays=(new Date(maxD)-new Date(minD))/864e5;
      const bucket=diffDays>365?"month":diffDays>60?"week":"day";
      const bk=dt=>{const dd=new Date(dt);if(bucket==="month")return dd.getFullYear()+"-"+String(dd.getMonth()+1).padStart(2,"0");if(bucket==="week"){const w=new Date(dd);w.setDate(w.getDate()-w.getDay());return w.toISOString().slice(0,10);}return dt;};
      const map={};
      allDates.forEach(a=>{const k=bk(a.d);if(!map[k])map[k]={calls:0,notes:0,emails:0,sales:0};if(a.type==="call")map[k].calls++;else if(a.type==="sale")map[k].sales++;else{map[k].notes++;map[k].emails+=((map[k].notes%3)!==0)?1:0;}});
      const pts=Object.entries(map).sort((a,b)=>a[0].localeCompare(b[0])).map(([k,v])=>({l:k,...v}));
      const gMax=Math.max(...pts.map(d=>Math.max(d.calls,d.notes,d.emails,d.sales)),1);
      const W=Math.max(pts.length*24,800),H=280,PAD=40,PH=200;
      const x=i=>PAD+i*(W-PAD-10)/Math.max(pts.length-1,1);
      const y=(v)=>H-40-v/gMax*PH;
      const TC2={calls:"#3b5bdb",notes:"#7c3aed",emails:"#0891b2",sales:"#059669"};
      const line=(key)=>pts.map((p,i)=>`${x(i)},${y(p[key])}`).join(" ");
      return <Card style={{marginBottom:20,overflow:"visible"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px 10px"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Ic t="activity" s={14}/><span style={{fontSize:13,fontWeight:700}}>Activity Over Time</span></div>
          <div style={{display:"flex",gap:5}}>
            {["all","calls","notes","emails","sales"].map(f=><button key={f} onClick={()=>setGraphMode(f)} style={{padding:"4px 10px",borderRadius:6,border:"1px solid "+(graphMode===f?"#3b5bdb":"#e2e5ea"),background:graphMode===f?"#f0f4ff":"#fff",color:graphMode===f?"#3b5bdb":"#94a3b8",fontSize:10.5,fontWeight:graphMode===f?600:400,cursor:"pointer",fontFamily:"inherit"}}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
          </div>
        </div>
        <div style={{height:H,padding:"0 20px 14px",overflow:"hidden"}}>
          <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
            {[0.25,0.5,0.75,1].map(p=><line key={p} x1={PAD} y1={y(gMax*p)} x2={W-10} y2={y(gMax*p)} stroke="#f0f2f5" strokeWidth={1}/>)}
            {[0.25,0.5,0.75,1].map(p=><text key={p} x={PAD-4} y={y(gMax*p)+4} textAnchor="end" fontSize={10} fill="#b2bec3">{Math.round(gMax*p)}</text>)}
            {(graphMode==="all"||graphMode==="calls")&&<><polyline points={line("calls")} fill="none" stroke={TC2.calls} strokeWidth={2}/>{pts.map((p,i)=><circle key={i} cx={x(i)} cy={y(p.calls)} r={3} fill={TC2.calls}/>)}</>}
            {(graphMode==="all"||graphMode==="notes")&&<><polyline points={line("notes")} fill="none" stroke={TC2.notes} strokeWidth={2}/>{pts.map((p,i)=><circle key={i} cx={x(i)} cy={y(p.notes)} r={3} fill={TC2.notes}/>)}</>}
            {(graphMode==="all"||graphMode==="emails")&&<><polyline points={line("emails")} fill="none" stroke={TC2.emails} strokeWidth={2}/>{pts.map((p,i)=><circle key={i} cx={x(i)} cy={y(p.emails)} r={3} fill={TC2.emails}/>)}</>}
            {(graphMode==="all"||graphMode==="sales")&&<><polyline points={line("sales")} fill="none" stroke={TC2.sales} strokeWidth={2}/>{pts.map((p,i)=><circle key={i} cx={x(i)} cy={y(p.sales)} r={3} fill={TC2.sales}/>)}</>}
            {pts.filter((_,i)=>i%(Math.ceil(pts.length/12))===0).map((p,i)=>{const idx=pts.indexOf(p);return <text key={i} x={x(idx)} y={H-8} textAnchor="middle" fontSize={9} fill="#b2bec3">{p.l.length>7?p.l.slice(5):p.l}</text>;})}
          </svg>
        </div>
        <div style={{display:"flex",gap:16,justifyContent:"center",paddingBottom:12}}>
          <span style={{fontSize:11,color:TC2.calls}}>● Calls</span>
          <span style={{fontSize:11,color:TC2.notes}}>● Notes</span>
          <span style={{fontSize:11,color:TC2.emails}}>● Emails</span>
          <span style={{fontSize:11,color:TC2.sales}}>● Sales</span>
        </div>
      </Card>;
    })()}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
      <Card style={{overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 20px 10px",borderBottom:"1px solid #f0f2f5",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:13,fontWeight:700}}>Recent Activity</div>
          <div style={{display:"flex",alignItems:"center",gap:3,color:"#94a3b8"}}><Ic t="clock" s={12}/><span style={{fontSize:10,fontWeight:500}}>Live</span></div>
        </div>
        <div style={{flex:1,overflowY:"auto",maxHeight:320}}>
          {recent.slice(0,15).map(a=>(
            <div key={a.id} style={{padding:"10px 20px",borderBottom:"1px solid #f8f9fb",display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:TBG[a.type],display:"flex",alignItems:"center",justifyContent:"center",color:TC[a.type],flexShrink:0,marginTop:1}}><Ic t={TIC[a.type]} s={13}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.agent} → {a.client.split(" ")[0]}</div>
                <div style={{fontSize:11,color:"#64748b",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.summary}</div>
                <div style={{fontSize:10,color:"#94a3b8"}}>{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Agent Leaderboard with date range dropdown */}
      <Card style={{overflow:"visible",position:"relative"}}>
        <div style={{padding:"14px 20px 10px",borderBottom:"1px solid #f0f2f5",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Ic t="users" s={14}/><span style={{fontSize:13,fontWeight:700}}>Agent Leaderboard</span>
          </div>
          {/* Date range dropdown */}
          <div style={{position:"relative"}}>
            <button ref={dropBtnRef} onClick={()=>{if(!lbDropOpen&&dropBtnRef.current){const r=dropBtnRef.current.getBoundingClientRect();setDropPos({top:r.bottom+6,left:r.right});}setLbDropOpen(!lbDropOpen);setShowCustom(false);}} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:6,border:"1px solid #e2e5ea",background:lbDropOpen?"#f0f4ff":"#fff",fontSize:11,fontWeight:500,color:lbDropOpen?"#3b5bdb":"#64748b",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>
              <Ic t="clock" s={11}/>{curLabel}<span style={{transform:lbDropOpen?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s",display:"inline-flex"}}><Ic t="chev" s={10}/></span>
            </button>
          </div>
        </div>
        {/* Dropdown overlay rendered outside Card to avoid overflow clipping */}
        {lbDropOpen&&<>
          <div onClick={()=>{setLbDropOpen(false);setShowCustom(false);}} style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9998}}/>
          <div style={{position:"fixed",top:dropPos.top,left:dropPos.left,transform:"translateX(-100%)",background:"#fff",borderRadius:10,border:"1px solid #e2e5ea",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:9999,width:showCustom?340:180}}>
              {!showCustom&&<div style={{padding:4}}>
                {RANGE_OPTS.map(r=>(
                  <button key={r.k} onClick={()=>{if(r.k==="custom"){setShowCustom(true);}else{setLbRange(r.k);setLbDropOpen(false);}}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 12px",border:"none",background:lbRange===r.k&&r.k!=="custom"?"#f0f4ff":"transparent",color:lbRange===r.k&&r.k!=="custom"?"#3b5bdb":"#374151",fontSize:12,fontWeight:lbRange===r.k?600:400,cursor:"pointer",fontFamily:"inherit",borderRadius:6,transition:"all 0.1s"}} onMouseEnter={e=>{if(lbRange!==r.k)e.currentTarget.style.background="#f8f9fb"}} onMouseLeave={e=>{if(lbRange!==r.k)e.currentTarget.style.background="transparent"}}>
                    {r.l}
                    {lbRange===r.k&&r.k!=="custom"&&<span style={{color:"#3b5bdb"}}><Ic t="check" s={12}/></span>}
                    {r.k==="custom"&&<span style={{color:"#94a3b8"}}><Ic t="chev" s={10}/></span>}
                  </button>
                ))}
              </div>}
              {showCustom&&<div style={{padding:16}}>
                <button onClick={()=>setShowCustom(false)} style={{display:"flex",alignItems:"center",gap:4,border:"none",background:"none",color:"#64748b",fontSize:11,cursor:"pointer",fontFamily:"inherit",padding:0,marginBottom:12}}>
                  <span style={{transform:"rotate(180deg)",display:"inline-flex"}}><Ic t="chev" s={10}/></span>Back
                </button>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Choose Date Range</div>
                <div style={{display:"flex",gap:12,marginBottom:14}}>
                  <CalendarPicker value={customFrom} onChange={setCustomFrom} label="From"/>
                  <CalendarPicker value={customTo} onChange={setCustomTo} label="To"/>
                </div>
                <button onClick={()=>{setLbRange("custom");setLbDropOpen(false);setShowCustom(false);}} style={{width:"100%",padding:"8px 0",borderRadius:8,border:"none",background:"#3b5bdb",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#2f4ec4"} onMouseLeave={e=>e.currentTarget.style.background="#3b5bdb"}>Apply Range</button>
              </div>}
          </div>
        </>}
        {/* Range label */}
        {lbRange!=="all"&&<div style={{padding:"6px 20px 0",fontSize:10,color:"#94a3b8"}}>
          {lbRange==="custom"?`${customFrom} → ${customTo}`:curLabel} · Filtered results
        </div>}
        <div>
          {agentEng.map((a,idx)=>{
            const mx=agentEng[0].total||1;
            return <div key={a.id} style={{padding:"12px 20px",borderBottom:"1px solid #f8f9fb",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:idx===0?"#fef3c7":idx===1?"#f1f5f9":idx===2?"#fef2f2":"#f8f9fb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:idx===0?"#d97706":idx===1?"#64748b":idx===2?"#dc2626":"#94a3b8",flexShrink:0}}>{idx+1}</div>
              <Avatar fallback={a.avatar} color={roleBg(a.role)} size={30}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                  <div><span style={{fontSize:12.5,fontWeight:600}}>{a.name}</span><span style={{fontSize:10,color:"#94a3b8",marginLeft:6}}>{a.role}</span></div>
                  <span style={{fontSize:13,fontWeight:700}}>{a.total}</span>
                </div>
                <div style={{display:"flex",height:5,borderRadius:3,overflow:"hidden",background:"#f0f2f5"}}>
                  <div style={{width:`${(a.ac/mx)*100}%`,background:TC.call,transition:"width 0.5s"}}/>
                  <div style={{width:`${(a.an/mx)*100}%`,background:TC.note,transition:"width 0.5s"}}/>
                  <div style={{width:`${(a.ae/mx)*100}%`,background:TC.email,transition:"width 0.5s"}}/>
                </div>
                <div style={{display:"flex",gap:10,marginTop:4}}>
                  <span style={{fontSize:9.5,color:TC.call,fontWeight:600}}>{a.ac} calls</span>
                  <span style={{fontSize:9.5,color:TC.note,fontWeight:600}}>{a.an} notes</span>
                  <span style={{fontSize:9.5,color:TC.email,fontWeight:600}}>{a.ae} emails</span>
                </div>
              </div>
            </div>;
          })}
          {agentEng.every(a=>a.total===0)&&<div style={{padding:"20px",textAlign:"center",color:"#94a3b8",fontSize:12}}>No activity in this date range.</div>}
        </div>
      </Card>
    </div>
    <Card style={{overflow:"hidden"}}>
      <div style={{padding:"14px 20px 10px",borderBottom:"1px solid #f0f2f5",display:"flex",alignItems:"center",gap:8}}>
        <Ic t="target" s={14}/><span style={{fontSize:13,fontWeight:700}}>Client Engagement</span><span style={{fontSize:11,color:"#94a3b8",marginLeft:4}}>Top 25 of {clientEng.length}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 60px 60px 60px 60px 52px",padding:"8px 20px",fontSize:9.5,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,borderBottom:"1px solid #f5f6f8"}}>
        <span>Client</span><span style={{textAlign:"center"}}>Calls</span><span style={{textAlign:"center"}}>Notes</span><span style={{textAlign:"center"}}>Sales</span><span style={{textAlign:"center"}}>Emails</span><span style={{textAlign:"center"}}>Trend</span>
      </div>
      {clientEng.slice(0,25).map(c=>(
        <div key={c.id} onClick={()=>{setSel(c);setSec("clients");setTab("info")}} style={{display:"grid",gridTemplateColumns:"1fr 60px 60px 60px 60px 52px",padding:"10px 20px",alignItems:"center",borderBottom:"1px solid #f8f9fb",fontSize:12,cursor:"pointer",transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div>
            <div style={{fontWeight:600,fontSize:12.5,marginBottom:2}}>{c.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10.5,color:"#64748b"}}>{c.co}</span>
              <span style={{fontSize:9.5,fontWeight:600,padding:"1px 6px",borderRadius:8,background:tBg(c.ti),color:tC(c.ti)}}>{c.ti}</span>
            </div>
          </div>
          <span style={{textAlign:"center",fontWeight:600,color:TC.call}}>{c.cc}</span>
          <span style={{textAlign:"center",fontWeight:600,color:TC.note}}>{c.cn}</span>
          <span style={{textAlign:"center",fontWeight:600,color:TC.sale}}>{c.cs}</span>
          <span style={{textAlign:"center",fontWeight:600,color:TC.email}}>{c.ce}</span>
          <div style={{display:"flex",justifyContent:"center",color:c.trend==="up"?"#16a34a":"#ef4444"}}><Ic t={c.trend==="up"?"arrowUp":"arrowDown"} s={14}/></div>
        </div>
      ))}
    </Card>
  </div>;
};

/* ══════════════════════════════════════════════════════════
