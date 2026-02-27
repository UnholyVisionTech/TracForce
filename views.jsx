            const selM=kpiMember?teamKpi.find(m=>m.id===kpiMember):null;
            const fmtRev=v=>"$"+v.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0});
            const fmtHrs=v=>{const h=Math.floor(v/60);const m=Math.round(v%60);return h>0?h+"h "+m+"m":m+"m";};
            const StatBox=({label,value,sub,color,icon})=><Card style={{padding:"18px 22px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:32,height:32,borderRadius:8,background:color+"18",display:"flex",alignItems:"center",justifyContent:"center",color}}><Ic t={icon} s={16}/></div><span style={{fontSize:10.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600}}>{label}</span></div><div style={{fontSize:26,fontWeight:700,color:"#1a1a2e"}}>{value}</div>{sub&&<div style={{fontSize:12,color:"#64748b",marginTop:2}}>{sub}</div>}</Card>;
            const BarRow=({label,value,max,color})=><div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0"}}><span style={{fontSize:12,fontWeight:500,width:100,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</span><div style={{flex:1,height:22,background:"#f5f6f8",borderRadius:6,overflow:"hidden"}}><div style={{height:"100%",background:color,borderRadius:6,width:max>0?(value/max*100)+"%":"0%",transition:"width 0.3s"}}/></div><span style={{fontSize:12,fontWeight:700,width:50,textAlign:"right",flexShrink:0}}>{value}</span></div>;
            return <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  {selM&&<Back label="Team KPI" onClick={()=>setKpiMember(null)}/>}
                  {!selM&&<><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg, #3b5bdb 0%, #059669 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><Ic t="signal" s={16}/></div><h1 style={{fontSize:22,fontWeight:700,margin:0}}>Key Performance Indicators</h1></>}
                  {selM&&<div style={{display:"flex",alignItems:"center",gap:10}}><Avatar src={selM.photo} fallback={selM.avatar} color={roleBg(selM.role)+"30"} size={36}/><div><h1 style={{fontSize:20,fontWeight:700,margin:0}}>{selM.name}</h1><div style={{fontSize:12,color:roleBg(selM.role),fontWeight:600}}>{selM.role}</div></div></div>}
                </div>
                <div style={{position:"relative"}}><button onClick={()=>{setKpiDrop(!kpiDrop);setKpiCustomView(false);}} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:8,border:kpiDrop?"2px solid #3b5bdb":"1px solid #e2e5ea",background:kpiDrop?"#f0f4ff":"#fff",fontSize:12,fontWeight:600,color:kpiDrop?"#3b5bdb":"#374151",cursor:"pointer",fontFamily:"inherit"}}><Ic t="clock" s={13}/>{kpiRange==="custom"?kpiFrom+" → "+kpiTo:{"1d":"1 Day","7d":"7 Days","1m":"1 Month","3m":"3 Months","6m":"6 Months","12m":"1 Year","all":"All Time"}[kpiRange]||"1 Month"}<span style={{transform:kpiDrop?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s",display:"inline-flex"}}><Ic t="chev" s={11}/></span></button>{kpiDrop&&<><div onClick={()=>{setKpiDrop(false);setKpiCustomView(false);}} style={{position:"fixed",inset:0,zIndex:98}}/><div style={{position:"absolute",top:"calc(100% + 4px)",right:0,width:kpiCustomView?340:200,background:"#fff",borderRadius:10,border:"1px solid #eef0f2",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:99}}>{!kpiCustomView&&<div style={{padding:4}}>{[["1d","1 Day"],["7d","7 Days"],["1m","1 Month"],["3m","3 Months"],["6m","6 Months"],["12m","1 Year"],["all","All Time"]].map(([k,l])=><button key={k} onClick={()=>{setKpiRange(k);setKpiDrop(false);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 12px",border:"none",background:kpiRange===k?"#f0f4ff":"transparent",color:kpiRange===k?"#3b5bdb":"#374151",fontSize:12,fontWeight:kpiRange===k?600:400,cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>{if(kpiRange!==k)e.currentTarget.style.background="#f8f9fb"}} onMouseLeave={e=>{if(kpiRange!==k)e.currentTarget.style.background="transparent"}}>{l}{kpiRange===k&&<Ic t="check" s={12}/>}</button>)}<div style={{borderTop:"1px solid #eef0f2",margin:"4px 0"}}/><button onClick={()=>setKpiCustomView(true)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 12px",border:"none",background:kpiRange==="custom"?"#f0f4ff":"transparent",color:kpiRange==="custom"?"#3b5bdb":"#374151",fontSize:12,fontWeight:kpiRange==="custom"?600:400,cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#f8f9fb"} onMouseLeave={e=>e.currentTarget.style.background=kpiRange==="custom"?"#f0f4ff":"transparent"}>Custom Range<Ic t="chev" s={10}/></button></div>}{kpiCustomView&&<div style={{padding:16}}><button onClick={()=>setKpiCustomView(false)} style={{display:"flex",alignItems:"center",gap:4,border:"none",background:"none",color:"#64748b",fontSize:11,cursor:"pointer",fontFamily:"inherit",padding:0,marginBottom:12}}><span style={{transform:"rotate(180deg)",display:"inline-flex"}}><Ic t="chev" s={10}/></span>Back</button><div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Choose Date Range</div><div style={{display:"flex",gap:12,marginBottom:14}}><CalendarPicker value={kpiFrom} onChange={setKpiFrom} label="From"/><CalendarPicker value={kpiTo} onChange={setKpiTo} label="To"/></div><button onClick={()=>{setKpiRange("custom");setKpiDrop(false);setKpiCustomView(false);}} style={{width:"100%",padding:"8px 0",borderRadius:8,border:"none",background:"#3b5bdb",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}} onMouseEnter={e=>e.currentTarget.style.background="#2f4ec4"} onMouseLeave={e=>e.currentTarget.style.background="#3b5bdb"}>Apply Range</button></div>}</div></>}</div>
              </div>

              {!selM&&<><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
                <StatBox label="Total Calls" value={totals.calls} sub={reachRate+"% reach rate"} color="#3b5bdb" icon="phone"/>
                <StatBox label="Phone Time" value={fmtHrs(totals.mins)} sub={Math.round(totals.mins/Math.max(totals.calls,1))+"m avg/call"} color="#0891b2" icon="clock"/>
                <StatBox label="Sales" value={totals.sales} sub={fmtRev(totals.rev)+" revenue"} color="#059669" icon="dollar"/>
                <StatBox label="Notes" value={totals.notes} sub={agents.length+" active agents"} color="#7c3aed" icon="note"/>
              </div>

              {(()=>{
                const pipeline=[
                  {label:"Active",id:"active",color:"#3b5bdb"},
                  {label:"New",id:"new",color:"#0891b2"},
                  {label:"Pending",id:"pending",color:"#f59e0b"},
                  {label:"Sold",id:"sold",color:"#059669"},
                  {label:"Cancelled",id:"cancelled",color:"#ef4444"},
                  {label:"Past",id:"past",color:"#94a3b8"}
                ];
                const pipeData=pipeline.map(p=>{
                  let count=0,rev=0;
                  if(p.id==="active")clients.forEach(c=>{if(!c.listTag&&c.lead!=="DNC"){count++;rev+=(sales[c.id]||[]).filter(x=>x.d>=kpiStartStr&&x.d<=kpiEndStr).reduce((s,x)=>s+x.amt,0);}});
                  else clients.forEach(c=>{if(c.listTag===p.id){count++;rev+=(sales[c.id]||[]).filter(x=>x.d>=kpiStartStr&&x.d<=kpiEndStr).reduce((s,x)=>s+x.amt,0);}});
                  return {...p,count,rev};
                }).filter(p=>p.count>0);
                const totalPipeCount=pipeData.reduce((s,p)=>s+p.count,0);
                const totalPipeRev=pipeData.reduce((s,p)=>s+p.rev,0);
                const PieChart=({data,total,valueKey,fmt,size=180})=>{
                  if(!total)return <div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",color:"#cbd5e1",fontSize:12}}>No data</div>;
                  let cum=0;
                  const slices=data.map(d=>{const pct=d[valueKey]/total;const start=cum;cum+=pct;return {...d,pct,start};});
                  const r=size/2-4;const cx=size/2;const cy=size/2;
                  const arc=(startAngle,endAngle)=>{const s=startAngle*2*Math.PI-Math.PI/2;const e=endAngle*2*Math.PI-Math.PI/2;const lg=endAngle-startAngle>0.5?1:0;return `M ${cx+r*Math.cos(s)} ${cy+r*Math.sin(s)} A ${r} ${r} 0 ${lg} 1 ${cx+r*Math.cos(e)} ${cy+r*Math.sin(e)} L ${cx} ${cy} Z`;};
                  return <svg width={size} height={size} style={{display:"block"}}>
                    {slices.length===1?<circle cx={cx} cy={cy} r={r} fill={slices[0].color}/>:slices.map((sl,i)=>sl.pct>0.001&&<path key={i} d={arc(sl.start,sl.start+sl.pct-0.003)} fill={sl.color} stroke="#fff" strokeWidth={2}/>)}
                    <circle cx={cx} cy={cy} r={r*0.55} fill="#fff"/>
                    <text x={cx} y={cy-6} textAnchor="middle" fontSize={18} fontWeight="700" fill="#1a1a2e">{fmt(total)}</text>
                    <text x={cx} y={cy+10} textAnchor="middle" fontSize={10} fill="#94a3b8">Total</text>
                  </svg>;
                };
                const Legend=({data,total,valueKey,fmt})=><div style={{display:"flex",flexDirection:"column",gap:6,flex:1}}>{data.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",borderRadius:8,background:d.color+"08"}}><div style={{width:10,height:10,borderRadius:3,background:d.color,flexShrink:0}}/><span style={{fontSize:12,fontWeight:500,flex:1}}>{d.label}</span><span style={{fontSize:12,fontWeight:700,color:d.color}}>{fmt(d[valueKey])}</span><span style={{fontSize:10,color:"#94a3b8"}}>{total>0?Math.round(d[valueKey]/total*100):0}%</span></div>)}</div>;
                return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                  <Card style={{padding:"22px 26px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><div style={{width:28,height:28,borderRadius:8,background:"#3b5bdb18",display:"flex",alignItems:"center",justifyContent:"center",color:"#3b5bdb"}}><Ic t="users" s={14}/></div><span style={{fontSize:14,fontWeight:700}}>Pipeline by Status</span></div>
                    <div style={{display:"flex",alignItems:"center",gap:24}}>
                      <PieChart data={pipeData} total={totalPipeCount} valueKey="count" fmt={v=>String(v)} size={170}/>
                      <Legend data={pipeData} total={totalPipeCount} valueKey="count" fmt={v=>String(v)}/>
                    </div>
                  </Card>
                  <Card style={{padding:"22px 26px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><div style={{width:28,height:28,borderRadius:8,background:"#05966918",display:"flex",alignItems:"center",justifyContent:"center",color:"#059669"}}><Ic t="dollar" s={14}/></div><span style={{fontSize:14,fontWeight:700}}>Revenue by Status</span></div>
                    <div style={{display:"flex",alignItems:"center",gap:24}}>
                      <PieChart data={pipeData.filter(d=>d.rev>0)} total={totalPipeRev} valueKey="rev" fmt={v=>fmtRev(v)} size={170}/>
                      <Legend data={pipeData.filter(d=>d.rev>0)} total={totalPipeRev} valueKey="rev" fmt={v=>fmtRev(v)}/>
                    </div>
                  </Card>
                </div>;
              })()}

              <Card style={{overflow:"hidden",marginBottom:20}}>
                <div style={{padding:"14px 20px",borderBottom:"1px solid #eef0f2",display:"flex",alignItems:"center",gap:8}}><Ic t="users" s={15}/><span style={{fontSize:14,fontWeight:700}}>Team Performance</span></div>
                <div style={{display:"grid",gridTemplateColumns:"1.6fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.5fr",padding:"10px 20px",fontSize:9.5,textTransform:"uppercase",letterSpacing:0.8,color:"#94a3b8",fontWeight:600,borderBottom:"1px solid #f5f6f8"}}><span>Agent</span><span style={{textAlign:"center"}}>Calls</span><span style={{textAlign:"center"}}>Phone Time</span><span style={{textAlign:"center"}}>Sales</span><span style={{textAlign:"center"}}>Revenue</span><span style={{textAlign:"center"}}>Notes</span><span style={{textAlign:"center"}}>Reach %</span></div>
                {teamKpi.sort((a,b)=>b.kpi.totalCalls-a.kpi.totalCalls).map(m=>(<div key={m.id} onClick={()=>setKpiMember(m.id)} style={{display:"grid",gridTemplateColumns:"1.6fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.5fr",padding:"13px 20px",borderBottom:"1px solid #f5f6f8",alignItems:"center",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar src={m.photo} fallback={m.avatar} color={roleBg(m.role)+"30"} size={32}/><div><div style={{fontWeight:600,fontSize:13}}>{m.name}</div><div style={{fontSize:11,color:roleBg(m.role)}}>{m.role}</div></div></div>
                  <div style={{textAlign:"center",fontWeight:700,fontSize:14,color:"#3b5bdb"}}>{m.kpi.totalCalls}</div>
                  <div style={{textAlign:"center",fontSize:12,fontWeight:600,color:"#0891b2"}}>{fmtHrs(m.kpi.totalMins)}</div>
                  <div style={{textAlign:"center",fontWeight:700,fontSize:14,color:"#059669"}}>{m.kpi.totalSales}</div>
                  <div style={{textAlign:"center",fontSize:12,fontWeight:600,color:"#059669"}}>{fmtRev(m.kpi.totalRev)}</div>
                  <div style={{textAlign:"center",fontSize:13,fontWeight:600,color:"#7c3aed"}}>{m.kpi.totalNotes}</div>
                  <div style={{textAlign:"center"}}><span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:10,background:m.kpi.reachRate>=70?"#f0fdf4":m.kpi.reachRate>=40?"#fffbeb":"#fef2f2",color:m.kpi.reachRate>=70?"#059669":m.kpi.reachRate>=40?"#f59e0b":"#ef4444"}}>{m.kpi.reachRate}%</span></div>
                </div>))}
              </Card>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <Card style={{padding:"18px 22px"}}><div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Calls by Agent</div>{teamKpi.sort((a,b)=>b.kpi.totalCalls-a.kpi.totalCalls).map(m=><BarRow key={m.id} label={m.name.split(" ")[0]} value={m.kpi.totalCalls} max={Math.max(...teamKpi.map(x=>x.kpi.totalCalls),1)} color="#3b5bdb"/>)}</Card>
                <Card style={{padding:"18px 22px"}}><div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Revenue by Agent</div>{teamKpi.sort((a,b)=>b.kpi.totalRev-a.kpi.totalRev).map(m=><BarRow key={m.id} label={m.name.split(" ")[0]} value={fmtRev(m.kpi.totalRev)} max={Math.max(...teamKpi.map(x=>x.kpi.totalRev),1)} color="#059669"/>)}</Card>
              </div></>}

              {selM&&<><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
                <StatBox label="Calls Made" value={selM.kpi.totalCalls} sub={selM.kpi.inbound+" in / "+selM.kpi.outbound+" out"} color="#3b5bdb" icon="phone"/>
                <StatBox label="Phone Time" value={fmtHrs(selM.kpi.totalMins)} sub={selM.kpi.totalCalls>0?Math.round(selM.kpi.totalMins/selM.kpi.totalCalls)+"m avg":"—"} color="#0891b2" icon="clock"/>
                <StatBox label="Sales Closed" value={selM.kpi.totalSales} sub={fmtRev(selM.kpi.totalRev)+" revenue"} color="#059669" icon="dollar"/>
                <StatBox label="Reach Rate" value={selM.kpi.reachRate+"%"} sub={selM.kpi.reached+" of "+selM.kpi.totalCalls+" reached"} color={selM.kpi.reachRate>=70?"#059669":selM.kpi.reachRate>=40?"#f59e0b":"#ef4444"} icon="phone"/>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                <Card style={{padding:"18px 22px"}}><div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Call Breakdown</div>
                  <div style={{display:"flex",gap:20,marginBottom:16}}>
                    <div style={{textAlign:"center",flex:1,padding:"14px",borderRadius:10,background:"#f0f4ff"}}><div style={{fontSize:22,fontWeight:700,color:"#3b5bdb"}}>{selM.kpi.outbound}</div><div style={{fontSize:11,color:"#64748b",marginTop:2}}>Outbound</div></div>
                    <div style={{textAlign:"center",flex:1,padding:"14px",borderRadius:10,background:"#f0fafe"}}><div style={{fontSize:22,fontWeight:700,color:"#0891b2"}}>{selM.kpi.inbound}</div><div style={{fontSize:11,color:"#64748b",marginTop:2}}>Inbound</div></div>
                    <div style={{textAlign:"center",flex:1,padding:"14px",borderRadius:10,background:"#f0fdf4"}}><div style={{fontSize:22,fontWeight:700,color:"#059669"}}>{selM.kpi.reached}</div><div style={{fontSize:11,color:"#64748b",marginTop:2}}>Reached</div></div>
                  </div>
                </Card>
                <Card style={{padding:"18px 22px"}}><div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Activity Summary</div>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:8,background:"#f8fafc"}}><span style={{fontSize:12,color:"#64748b"}}>Assigned Clients</span><span style={{fontSize:13,fontWeight:700}}>{selM.kpi.assignedClients}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:8,background:"#f8fafc"}}><span style={{fontSize:12,color:"#64748b"}}>Notes Written</span><span style={{fontSize:13,fontWeight:700,color:"#7c3aed"}}>{selM.kpi.totalNotes}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:8,background:"#f8fafc"}}><span style={{fontSize:12,color:"#64748b"}}>Avg Call Length</span><span style={{fontSize:13,fontWeight:700,color:"#0891b2"}}>{selM.kpi.totalCalls>0?Math.round(selM.kpi.totalMins/selM.kpi.totalCalls)+"m":"—"}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:8,background:"#f0fdf4"}}><span style={{fontSize:12,color:"#64748b"}}>Revenue Generated</span><span style={{fontSize:13,fontWeight:700,color:"#059669"}}>{fmtRev(selM.kpi.totalRev)}</span></div>
                  </div>
                </Card>
              </div>

              {(()=>{
                const agPipeline=[
                  {label:"Active",id:"active",color:"#3b5bdb"},
                  {label:"New",id:"new",color:"#0891b2"},
                  {label:"Pending",id:"pending",color:"#f59e0b"},
                  {label:"Sold",id:"sold",color:"#059669"},
                  {label:"Cancelled",id:"cancelled",color:"#ef4444"},
                  {label:"Past",id:"past",color:"#94a3b8"}
                ];
                const myClients=clients.filter(c=>c.assignedTo===selM.id);
                const agPipeData=agPipeline.map(p=>{
                  let count=0,rev=0;
                  if(p.id==="active")myClients.forEach(c=>{if(!c.listTag&&c.lead!=="DNC"){count++;rev+=(sales[c.id]||[]).filter(x=>x.d>=kpiStartStr&&x.d<=kpiEndStr).reduce((s,x)=>s+x.amt,0);}});
                  else myClients.forEach(c=>{if(c.listTag===p.id){count++;rev+=(sales[c.id]||[]).filter(x=>x.d>=kpiStartStr&&x.d<=kpiEndStr).reduce((s,x)=>s+x.amt,0);}});
                  return {...p,count,rev};
                }).filter(p=>p.count>0);
                const agTotCount=agPipeData.reduce((s,p)=>s+p.count,0);
                const agTotRev=agPipeData.reduce((s,p)=>s+p.rev,0);
                const PieChart2=({data,total,valueKey,fmt,size=150})=>{
                  if(!total)return <div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",color:"#cbd5e1",fontSize:12}}>No data</div>;
                  let cum=0;
                  const slices=data.map(d=>{const pct=d[valueKey]/total;const start=cum;cum+=pct;return {...d,pct,start};});
                  const r=size/2-4;const ccx=size/2;const ccy=size/2;
                  const arc2=(startAngle,endAngle)=>{const s=startAngle*2*Math.PI-Math.PI/2;const e=endAngle*2*Math.PI-Math.PI/2;const lg=endAngle-startAngle>0.5?1:0;return `M ${ccx+r*Math.cos(s)} ${ccy+r*Math.sin(s)} A ${r} ${r} 0 ${lg} 1 ${ccx+r*Math.cos(e)} ${ccy+r*Math.sin(e)} L ${ccx} ${ccy} Z`;};
                  return <svg width={size} height={size} style={{display:"block"}}>
                    {slices.length===1?<circle cx={ccx} cy={ccy} r={r} fill={slices[0].color}/>:slices.map((sl,i)=>sl.pct>0.001&&<path key={i} d={arc2(sl.start,sl.start+sl.pct-0.003)} fill={sl.color} stroke="#fff" strokeWidth={2}/>)}
                    <circle cx={ccx} cy={ccy} r={r*0.55} fill="#fff"/>
                    <text x={ccx} y={ccy-4} textAnchor="middle" fontSize={16} fontWeight="700" fill="#1a1a2e">{fmt(total)}</text>
                    <text x={ccx} y={ccy+10} textAnchor="middle" fontSize={9} fill="#94a3b8">Total</text>
                  </svg>;
                };
                return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                  <Card style={{padding:"18px 22px"}}><div style={{fontSize:13,fontWeight:700,marginBottom:14}}>My Pipeline</div>
                    <div style={{display:"flex",alignItems:"center",gap:20}}>
                      <PieChart2 data={agPipeData} total={agTotCount} valueKey="count" fmt={v=>String(v)}/>
                      <div style={{display:"flex",flexDirection:"column",gap:5,flex:1}}>{agPipeData.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/><span style={{fontSize:11,flex:1}}>{d.label}</span><span style={{fontSize:11,fontWeight:700,color:d.color}}>{d.count}</span></div>)}</div>
                    </div>
                  </Card>
                  <Card style={{padding:"18px 22px"}}><div style={{fontSize:13,fontWeight:700,marginBottom:14}}>My Revenue Split</div>
                    <div style={{display:"flex",alignItems:"center",gap:20}}>
                      <PieChart2 data={agPipeData.filter(d=>d.rev>0)} total={agTotRev} valueKey="rev" fmt={v=>fmtRev(v)}/>
                      <div style={{display:"flex",flexDirection:"column",gap:5,flex:1}}>{agPipeData.filter(d=>d.rev>0).map(d=><div key={d.id} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/><span style={{fontSize:11,flex:1}}>{d.label}</span><span style={{fontSize:11,fontWeight:700,color:d.color}}>{fmtRev(d.rev)}</span></div>)}</div>
                    </div>
                  </Card>
                </div>;
              })()}

              <Card style={{overflow:"hidden"}}><div style={{padding:"14px 20px",borderBottom:"1px solid #eef0f2",fontSize:13,fontWeight:700}}>Recent Sales</div>
                {(()=>{const sn=selM.name.split(" ")[0]+" "+selM.name.split(" ")[1][0]+".";const ms=[];Object.entries(sales).forEach(([cid,arr])=>arr.forEach(s=>{if(s.ag===sn&&s.d>=kpiStartStr&&s.d<=kpiEndStr){const cl=clients.find(x=>x.id===Number(cid));ms.push({...s,client:cl?cl.name:"Unknown"});}}));ms.sort((a,b)=>b.d.localeCompare(a.d));return ms.length?ms.slice(0,10).map(s=>(<div key={s.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:"1px solid #f5f6f8"}}><div><div style={{fontSize:13,fontWeight:600}}>{s.product||"Untitled"}</div><div style={{fontSize:11,color:"#94a3b8"}}>{s.client} · {s.d}</div></div><span style={{fontSize:14,fontWeight:700,color:"#059669"}}>{fmtRev(s.amt)}</span></div>)):<div style={{padding:24,textAlign:"center",color:"#94a3b8",fontSize:13}}>No sales in this period.</div>;})()}
              </Card></>}
            </div>;
          })()}

          {!dialClient&&sec==="clients"&&!sel&&<div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <h1 style={{fontSize:22,fontWeight:700,margin:0,letterSpacing:-0.5}}>Client Tracking</h1>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setUploadMyLeadsModal(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}><Ic t="assign" s={14}/>Upload My Leads</button>
                <button onClick={()=>setImportModal(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}><Ic t="upload" s={14}/>Import</button>
                <button onClick={exportCSV} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}><Ic t="download" s={14}/>Export CSV</button>
                <button onClick={()=>{setNewCl({name:"",co:"",em:"",ph:"",ti:"Pro",lead:"Warm",dest:"Main Database",listTag:listFilter.length===1&&listFilter[0]!=="dnc"?listFilter[0]:null});setAddClientModal(true)}} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:8,border:"none",background:"#1a1a2e",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#fff"}}><Ic t="plus" s={14}/>Add Client</button>
              </div>
            </div>

            {/* Lists */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>Lists</div>
              <div style={{display:"flex",gap:10}}>
                {DB_LISTS.map(db=>{const isActive=activeList===db.id;const cnt=clients.filter(c=>{const inDb=db.dests.includes(c.dest);const myL=!myLeads||c.assignedTo===curUserId;return inDb&&myL;}).length;return(
                  <button key={db.id} onClick={()=>{setActiveList(isActive?null:db.id);setLeadFilter("All");}} style={{flex:1,display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderRadius:10,border:isActive?`2px solid ${db.color}`:"1px solid #eef0f2",background:isActive?db.color+"08":"#fff",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",position:"relative",overflow:"hidden"}} onMouseEnter={e=>{if(!isActive)e.currentTarget.style.borderColor=db.color+"60"}} onMouseLeave={e=>{if(!isActive)e.currentTarget.style.borderColor="#eef0f2"}}>
                    {isActive&&<div style={{position:"absolute",top:0,left:0,width:"100%",height:3,background:db.color}}/>}
                    <div style={{width:34,height:34,borderRadius:9,background:db.color+(isActive?"20":"10"),display:"flex",alignItems:"center",justifyContent:"center",color:db.color,flexShrink:0}}><Ic t={db.icon} s={16}/></div>
                    <div style={{textAlign:"left",flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:isActive?700:500,color:isActive?db.color:"#374151",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{db.name}</div>
                      <div style={{fontSize:11,color:"#94a3b8",marginTop:1}}>{cnt} client{cnt!==1?"s":""}</div>
                    </div>
                    {isActive&&<div style={{width:8,height:8,borderRadius:"50%",background:db.color,flexShrink:0}}/>}
                  </button>
                );})}
              </div>
            </div>



            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {["All","Hot","Warm","Cold","DNC"].map(l=>(
                  <button key={l} onClick={()=>setLeadFilter(l)} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 14px",borderRadius:8,border:leadFilter===l?`2px solid ${l==="All"?(activeList?DB_LISTS.find(d=>d.id===activeList)?.color:"#1a1a2e"):leadColor(l)}`:"1px solid #e2e5ea",background:leadFilter===l?(l==="All"?"#f0f2f5":leadBg(l)):"#fff",fontSize:12,fontWeight:leadFilter===l?600:400,color:leadFilter===l?(l==="All"?(activeList?DB_LISTS.find(d=>d.id===activeList)?.color:"#1a1a2e"):leadColor(l)):"#94a3b8",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>
                    {l==="Hot"&&<Ic t="flame" s={12}/>}{l}{l!=="All"&&<span style={{fontSize:10,fontWeight:600,marginLeft:2}}>({clients.filter(c=>{const ml2=c.lead===l;const dl2=!activeList||DB_LISTS.find(d=>d.id===activeList)?.dests.includes(c.dest);const myL2=!myLeads||c.assignedTo===curUserId;return ml2&&dl2&&myL2;}).length})</span>}
                  </button>
                ))}
                <div style={{width:1,height:20,background:"#e2e5ea",margin:"0 2px"}}/>
                <button onClick={()=>{setMyLeads(!myLeads);setLeadFilter("All");}} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,border:myLeads?"1px solid #1a1a2e":"1px solid #e2e5ea",background:myLeads?"#1a1a2e":"#fff",fontSize:12,fontWeight:myLeads?600:400,color:myLeads?"#fff":"#94a3b8",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",flexShrink:0,boxShadow:myLeads?"inset 0 0 0 1px #1a1a2e":"none"}}><Ic t="team" s={13}/>My Leads{(()=>{const cnt=clients.filter(c=>{const myL2=c.assignedTo===curUserId;const dl2=!activeList||DB_LISTS.find(d=>d.id===activeList)?.dests.includes(c.dest);return myL2&&dl2;}).length;return <span style={{fontSize:10,fontWeight:600,marginLeft:2}}>({cnt})</span>;})()}</button>
                <div style={{width:1,height:20,background:"#e2e5ea",margin:"0 2px"}}/>
                <div style={{position:"relative"}}><button onClick={()=>setListDrop(!listDrop)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,border:listFilter.length?"2px solid #3b5bdb":"1px solid #e2e5ea",background:listFilter.length?"#f0f4ff":"#fff",fontSize:12,fontWeight:listFilter.length?600:400,color:listFilter.length?"#3b5bdb":"#94a3b8",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",flexShrink:0}}>{listFilter.length?<>{listFilter.length===1?(()=>{const all=[...BUILT_IN_LISTS,...customLists];const f=all.find(x=>x.id===listFilter[0]);return f?f.name:listFilter[0];})():listFilter.length+" lists"}</>:"⋯"}</button>{listDrop&&<><div onClick={()=>setListDrop(false)} style={{position:"fixed",inset:0,zIndex:98}}/><div style={{position:"absolute",top:"calc(100% + 4px)",right:0,width:220,background:"#fff",borderRadius:10,border:"1px solid #eef0f2",boxShadow:"0 8px 24px rgba(0,0,0,0.1)",zIndex:99,overflow:"hidden"}}><div onClick={()=>{setListFilter([]);if(leadFilter==="DNC")setLeadFilter("All");}} style={{padding:"10px 14px",fontSize:12,fontWeight:600,cursor:"pointer",background:!listFilter.length?"#f0f2f5":"transparent",color:!listFilter.length?"#1a1a2e":"#64748b",borderBottom:"1px solid #f5f6f8"}} onMouseEnter={e=>{if(listFilter.length)e.currentTarget.style.background="#fafbfc"}} onMouseLeave={e=>{if(listFilter.length)e.currentTarget.style.background="transparent"}}>All Lists</div>{BUILT_IN_LISTS.map(bl=>{const cnt=bl.id==="dnc"?clients.filter(c=>c.lead==="DNC").length:clients.filter(c=>c.listTag===bl.id).length;const isOn=listFilter.includes(bl.id);return <div key={bl.id} onClick={()=>{if(isOn){const nf=listFilter.filter(f=>f!==bl.id);setListFilter(nf);if(bl.id==="dnc"&&leadFilter==="DNC")setLeadFilter("All");}else{setListFilter([...listFilter,bl.id]);if(bl.id==="dnc")setLeadFilter("DNC");}}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",background:isOn?bl.color+"12":"transparent",borderLeft:isOn?"3px solid "+bl.color:"3px solid transparent",borderBottom:"1px solid #f5f6f8"}} onMouseEnter={e=>{if(!isOn)e.currentTarget.style.background="#fafbfc"}} onMouseLeave={e=>{if(!isOn)e.currentTarget.style.background="transparent"}}><div style={{width:18,height:18,borderRadius:5,border:"2px solid "+(isOn?bl.color:"#d1d5db"),background:isOn?bl.color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{isOn&&<Ic t="check" s={10}/>}</div><div style={{width:20,height:20,borderRadius:5,background:bl.color+"18",display:"flex",alignItems:"center",justifyContent:"center",color:bl.color}}>{bl.icon?<Ic t={bl.icon} s={11}/>:<svg viewBox="0 0 24 24" style={{width:11,height:11,stroke:"currentColor",strokeWidth:2,fill:"none"}}><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>}</div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:isOn?700:500,color:isOn?bl.color:"#374151"}}>{bl.name}</div></div><span style={{fontSize:10,fontWeight:600,padding:"1px 6px",borderRadius:10,background:bl.color+"18",color:bl.color}}>{cnt}</span></div>})}{customLists.map(cl=>{const cnt=clients.filter(c=>c.listTag===cl.id).length;const isOn=listFilter.includes(cl.id);return <div key={cl.id} onClick={()=>{if(isOn)setListFilter(listFilter.filter(f=>f!==cl.id));else setListFilter([...listFilter,cl.id]);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",background:isOn?cl.color+"12":"transparent",borderLeft:isOn?"3px solid "+cl.color:"3px solid transparent",borderBottom:"1px solid #f5f6f8"}} onMouseEnter={e=>{if(!isOn)e.currentTarget.style.background="#fafbfc"}} onMouseLeave={e=>{if(!isOn)e.currentTarget.style.background="transparent"}}><div style={{width:18,height:18,borderRadius:5,border:"2px solid "+(isOn?cl.color:"#d1d5db"),background:isOn?cl.color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{isOn&&<Ic t="check" s={10}/>}</div><div style={{width:20,height:20,borderRadius:5,background:cl.color+"18",display:"flex",alignItems:"center",justifyContent:"center",color:cl.color}}><Ic t="target" s={11}/></div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:isOn?700:500,color:isOn?cl.color:"#374151"}}>{cl.name}</div></div><span style={{fontSize:10,fontWeight:600,padding:"1px 6px",borderRadius:10,background:cl.color+"18",color:cl.color}}>{cnt}</span></div>})}<div onClick={()=>{setListDrop(false);setNewListModal(true);setNewListName("");setNewListColor("#3b5bdb");}} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",cursor:"pointer",borderTop:"1px solid #eef0f2",color:"#3b5bdb",fontSize:12,fontWeight:600}} onMouseEnter={e=>e.currentTarget.style.background="#f0f4ff"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><Ic t="plus" s={14}/>Create New List</div></div></>}</div>
              </div>
              <div style={{fontSize:11,color:"#94a3b8"}}>{listFilter.length>0&&<span style={{color:"#3b5bdb",fontWeight:600}}>{listFilter.map(f=>{const all=[...BUILT_IN_LISTS,...customLists];const m=all.find(x=>x.id===f);return m?m.name:f;}).join(" + ")}{" · "}</span>}{myLeads&&<span style={{color:"#1a1a2e",fontWeight:600}}>My Leads · </span>}{activeList&&<span style={{color:DB_LISTS.find(d=>d.id===activeList)?.color,fontWeight:600}}>{DB_LISTS.find(d=>d.id===activeList)?.name} · </span>}{fc.length} client{fc.length!==1?"s":""}</div>
            </div>
            <Card style={{overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1.8fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr 0.7fr 36px",padding:"11px 22px",borderBottom:"1px solid #eef0f2",fontSize:10.5,textTransform:"uppercase",letterSpacing:0.8,color:"#94a3b8",fontWeight:600}}><span>Client</span><span>Assigned To</span><span>Lead</span><span>Tier</span><span>Status</span><span>Dial</span><span>Last Contact</span><span/></div>
              {fc.map(c=>{const ag=c.assignedTo?team.find(m=>m.id===c.assignedTo):null;return(<div key={c.id} onClick={()=>{setSel(c);setTab("info")}} style={{display:"grid",gridTemplateColumns:"1.8fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr 0.7fr 36px",padding:"13px 22px",borderBottom:"1px solid #f5f6f8",alignItems:"center",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fafbfc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar src={c.photo} fallback={ini(c.name)} size={30}/><div><div style={{fontWeight:500,fontSize:13}}>{c.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{c.co}</div></div></div>
                {ag?<div style={{display:"flex",alignItems:"center",gap:6}}><Avatar src={ag.photo} fallback={ag.avatar} color={roleBg(ag.role)+"30"} size={22}/><span style={{fontSize:11,fontWeight:500,color:"#374151"}}>{ag.name.split(" ")[0]}</span></div>:<span style={{fontSize:11,color:"#cbd5e1"}}>Unassigned</span>}
                <LeadBadge lead={c.lead}/>
                <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:tBg(c.ti),color:tC(c.ti),width:"fit-content"}}>{c.ti}</span>
                <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:7,height:7,borderRadius:"50%",background:stColor(c.st)}}/><span style={{fontSize:12}}>{c.st}</span></div>
                <span style={{fontSize:12,color:"#64748b"}}>{c.lead==="DNC"?<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,background:"#7c3aed12",color:"#7c3aed",cursor:"not-allowed",position:"relative"}} title="DNC — Remove from DNC to dial"><svg viewBox="0 0 24 24" style={{width:15,height:15,stroke:"currentColor",strokeWidth:2,fill:"none"}}><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></div>:<button onClick={e=>{e.stopPropagation();openDial(c);setTimeout(()=>{setDialMethod("phone");setDialActive(true);},100);}} style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:8,border:"none",background:"#05966918",color:"#059669",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#05966930"} onMouseLeave={e=>e.currentTarget.style.background="#05966918"}><Ic t="phone" s={15}/></button>}</span><span style={{fontSize:11,color:"#94a3b8"}}>{c.lc}</span><Ic t="chev" s={14}/>
              </div>)})}
              {!fc.length&&<div style={{textAlign:"center",padding:36,color:"#94a3b8",fontSize:13}}>No clients match this filter.</div>}
            </Card>

            {/* IMPORT MODAL */}
            {importModal&&<div style={{position:"fixed",inset:0,background:"#00000040",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>{setImportModal(false);setImportFile(null);setImportRows([]);setImportStatus(null);}}>
              <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,padding:32,width:480,maxWidth:"90vw",boxShadow:"0 20px 60px #00000020"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}><h2 style={{margin:0,fontSize:18,fontWeight:700}}>Import Clients</h2><button onClick={()=>{setImportModal(false);setImportFile(null);setImportRows([]);setImportStatus(null);}} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",padding:0}}><Ic t="x" s={18}/></button></div>
                {importStatus&&<div style={{padding:"14px 18px",borderRadius:10,marginBottom:20,background:"#f0fdf4",border:"1px solid #bbf7d0"}}><div style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>✓ {importStatus}</div></div>}
                {!importStatus&&<><div style={{fontSize:13,color:"#64748b",marginBottom:20,lineHeight:1.6}}>Upload a CSV file to bulk-import clients. Columns: Name, Company, Email, Phone, Status, Tier, Lead.</div>
                <div style={{marginBottom:20}}>
                  <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:6}}>Destination Database</label>
                  <select value={importDest} onChange={e=>setImportDest(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fafbfc",fontSize:13,fontFamily:"inherit",outline:"none",cursor:"pointer"}}>{DESTINATIONS.map(d=><option key={d}>{d}</option>)}</select>
                </div>
                <div style={{border:"2px dashed "+(importFile?"#16a34a":"#d0d5dd"),borderRadius:12,padding:"36px 20px",textAlign:"center",marginBottom:20,cursor:"pointer",transition:"all 0.15s",background:importFile?"#f0fdf4":"#fafbfc"}} onMouseEnter={e=>{if(!importFile){e.currentTarget.style.borderColor="#1a1a2e";e.currentTarget.style.background="#f0f2f5";}}} onMouseLeave={e=>{if(!importFile){e.currentTarget.style.borderColor="#d0d5dd";e.currentTarget.style.background="#fafbfc";}}} onClick={()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".csv,.tsv";inp.onchange=e=>{const f=e.target.files[0];if(f){setImportFile(f);handleFileUpload(f,rows=>setImportRows(rows));}};inp.click();}}>
                  {!importFile&&<><div style={{width:44,height:44,borderRadius:12,background:"#f0f2f5",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><Ic t="upload" s={20}/></div>
                  <div style={{fontSize:14,fontWeight:600,color:"#374151",marginBottom:4}}>Click to upload</div>
                  <div style={{fontSize:12,color:"#94a3b8"}}>.csv, .tsv — Max 10MB</div></>}
                  {importFile&&<><div style={{fontSize:14,fontWeight:600,color:"#16a34a",marginBottom:4}}>✓ {importFile.name}</div><div style={{fontSize:12,color:"#64748b"}}>{importRows.length} row{importRows.length!==1?"s":""} detected · Click to change file</div></>}
                </div>
                {importRows.length>0&&<div style={{background:"#f8f9fb",borderRadius:10,padding:"12px 16px",marginBottom:20,maxHeight:120,overflow:"auto"}}><div style={{fontSize:11,fontWeight:600,color:"#94a3b8",marginBottom:6}}>Preview (first {Math.min(importRows.length,3)})</div>{importRows.slice(0,3).map((r,i)=><div key={i} style={{fontSize:12,color:"#374151",padding:"4px 0",borderBottom:i<2?"1px solid #eef0f2":"none"}}>{r.name} · {r.co||"—"} · {r.em||"—"} · {r.lead}</div>)}</div>}
                <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                  <button onClick={()=>{setImportModal(false);setImportFile(null);setImportRows([]);}} style={{padding:"9px 20px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#64748b"}}>Cancel</button>
                  <button onClick={()=>{if(importRows.length>0){const cnt=doImport(importRows,importDest,null);setImportStatus("Imported "+cnt+" client"+(cnt!==1?"s":"")+" to "+importDest);setImportFile(null);setImportRows([]);}}} disabled={importRows.length===0} style={{padding:"9px 20px",borderRadius:8,border:"none",background:importRows.length>0?"#1a1a2e":"#e2e5ea",color:importRows.length>0?"#fff":"#94a3b8",fontSize:13,fontWeight:500,cursor:importRows.length>0?"pointer":"default",fontFamily:"inherit"}}>Import {importRows.length} Client{importRows.length!==1?"s":""}</button>
                </div></>}
              </div>
            </div>}

            {/* ADD CLIENT MODAL */}
            {addClientModal&&<div style={{position:"fixed",inset:0,background:"#00000040",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setAddClientModal(false)}>
              <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,padding:32,width:480,maxWidth:"90vw",boxShadow:"0 20px 60px #00000020"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}><h2 style={{margin:0,fontSize:18,fontWeight:700}}>Add New Client</h2><button onClick={()=>setAddClientModal(false)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",padding:0}}><Ic t="x" s={18}/></button></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 16px",marginBottom:18}}>
                  {[["Name","name","text"],["Company","co","text"],["Email","em","email"],["Phone","ph","tel"]].map(([l,k,ty])=>(
                    <div key={k}><label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:5}}>{l}</label><input type={ty} value={newCl[k]} onChange={e=>setNewCl(p=>({...p,[k]:e.target.value}))} placeholder={l} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #e2e5ea",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:18}}>
                  <div><label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:5}}>Tier</label><select value={newCl.ti} onChange={e=>setNewCl(p=>({...p,ti:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #e2e5ea",fontSize:13,fontFamily:"inherit",outline:"none",cursor:"pointer",boxSizing:"border-box"}}>{["Starter","Pro","Enterprise"].map(t=><option key={t}>{t}</option>)}</select></div>
                  <div><label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:5}}>Lead Status</label><div style={{display:"flex",gap:6}}>{["Hot","Warm","Cold","DNC"].map(l=><button key={l} onClick={()=>setNewCl(p=>({...p,lead:l}))} style={{flex:1,padding:"8px 0",borderRadius:8,border:newCl.lead===l?`2px solid ${leadColor(l)}`:"1px solid #e2e5ea",background:newCl.lead===l?leadBg(l):"#fff",fontSize:11,fontWeight:newCl.lead===l?600:400,color:newCl.lead===l?leadColor(l):"#94a3b8",cursor:"pointer",fontFamily:"inherit"}}>{l}</button>)}</div></div>
                  <div><label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:5}}>List</label><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[{id:"none",name:"None",color:"#94a3b8"},...BUILT_IN_LISTS.filter(b=>b.id!=="dnc"),...customLists].map(lt=><button key={lt.id} onClick={()=>setNewCl(p=>({...p,listTag:lt.id==="none"?null:lt.id}))} style={{padding:"8px 12px",borderRadius:8,border:(newCl.listTag||"none")===lt.id?"2px solid "+lt.color:"1px solid #e2e5ea",background:(newCl.listTag||"none")===lt.id?lt.color+"18":"#fff",fontSize:11,fontWeight:(newCl.listTag||"none")===lt.id?600:400,color:(newCl.listTag||"none")===lt.id?lt.color:"#94a3b8",cursor:"pointer",fontFamily:"inherit"}}>{lt.name}</button>)}<button onClick={()=>{setAddClientModal(false);setNewListModal(true);setNewListName("");setNewListColor("#3b5bdb");}} style={{padding:"8px 12px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:11,fontWeight:400,color:"#3b5bdb",cursor:"pointer",fontFamily:"inherit"}}>+ New</button></div></div>
                  <div><label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:5}}>Status</label><select value={newCl.st||"Active"} onChange={e=>setNewCl(p=>({...p,st:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #e2e5ea",fontSize:13,fontFamily:"inherit",outline:"none",cursor:"pointer",boxSizing:"border-box"}}>{["Active","Pending","Inactive"].map(s=><option key={s}>{s}</option>)}</select></div>
                </div>
                <div style={{marginBottom:22}}>
                  <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:5}}>Destination Database</label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{DESTINATIONS.map(d=><button key={d} onClick={()=>setNewCl(p=>({...p,dest:d}))} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,border:newCl.dest===d?"2px solid #1a1a2e":"1px solid #e2e5ea",background:newCl.dest===d?"#f0f2f5":"#fff",fontSize:12,fontWeight:newCl.dest===d?600:400,color:newCl.dest===d?"#1a1a2e":"#94a3b8",cursor:"pointer",fontFamily:"inherit"}}><Ic t="db" s={12}/>{d}</button>)}</div>
                </div>
                <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                  <button onClick={()=>setAddClientModal(false)} style={{padding:"9px 20px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#64748b"}}>Cancel</button>
                  <button onClick={()=>{if(!newCl.name.trim())return;setClients(p=>[...p,{id:Date.now(),name:newCl.name,co:newCl.co,em:newCl.em,ph:newCl.ph,st:newCl.st||"Active",lc:new Date().toISOString().slice(0,10),ti:newCl.ti,photo:null,lead:newCl.lead,dest:newCl.dest,assignedTo:null,listTag:newCl.listTag||null}]);setAddClientModal(false);}} style={{padding:"9px 20px",borderRadius:8,border:"none",background:"#1a1a2e",color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Add Client</button>
                </div>
              </div>
            </div>}

            {/* UPLOAD MY LEADS MODAL */}
            {uploadMyLeadsModal&&<div style={{position:"fixed",inset:0,background:"#00000040",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>{setUploadMyLeadsModal(false);setUploadFile(null);}}>
              <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,padding:32,width:480,maxWidth:"90vw",boxShadow:"0 20px 60px #00000020"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}><h2 style={{margin:0,fontSize:18,fontWeight:700}}>Upload My Leads</h2><button onClick={()=>{setUploadMyLeadsModal(false);setUploadFile(null);}} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",padding:0}}><Ic t="x" s={18}/></button></div>
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:"#f0f4ff",borderRadius:10,marginBottom:20}}>
                  <Avatar src={curUser?.photo} fallback={curUser?.avatar||"?"} color={roleBg(role)+"30"} size={32}/>
                  <div><div style={{fontSize:13,fontWeight:600}}>{curUser?.name}</div><div style={{fontSize:11,color:"#64748b"}}>Leads will be assigned to you ({role})</div></div>
                </div>
                <div style={{fontSize:13,color:"#64748b",marginBottom:16,lineHeight:1.5}}>Upload a CSV with your leads. Columns: Name, Company, Email, Phone, Status, Tier, Lead.</div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:6}}>Destination Database</label>
                  <select value={uploadDest} onChange={e=>setUploadDest(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fafbfc",fontSize:13,fontFamily:"inherit",outline:"none",cursor:"pointer"}}>{DESTINATIONS.map(d=><option key={d}>{d}</option>)}</select>
                </div>
                <div style={{border:"2px dashed "+(uploadFile?"#16a34a":"#d0d5dd"),borderRadius:12,padding:"30px 20px",textAlign:"center",marginBottom:16,cursor:"pointer",background:uploadFile?"#f0fdf4":"#fafbfc"}} onClick={()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".csv,.tsv";inp.onchange=e=>{const f=e.target.files[0];if(f)setUploadFile(f);};inp.click();}}>
                  {!uploadFile&&<><div style={{width:40,height:40,borderRadius:10,background:"#f0f2f5",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}><Ic t="upload" s={18}/></div>
                  <div style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:3}}>Click to upload</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>.csv, .tsv</div></>}
                  {uploadFile&&<><div style={{fontSize:13,fontWeight:600,color:"#16a34a",marginBottom:3}}>✓ {uploadFile.name}</div><div style={{fontSize:11,color:"#64748b"}}>Click to change file</div></>}
                </div>
                <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                  <button onClick={()=>{setUploadMyLeadsModal(false);setUploadFile(null);}} style={{padding:"9px 20px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#64748b"}}>Cancel</button>
                  <button onClick={()=>{if(uploadFile){handleFileUpload(uploadFile,rows=>{const cnt=doImport(rows,uploadDest,curUserId);alert("Uploaded "+cnt+" lead"+(cnt!==1?"s":"")+" assigned to you.");setUploadMyLeadsModal(false);setUploadFile(null);});}}} disabled={!uploadFile} style={{padding:"9px 20px",borderRadius:8,border:"none",background:uploadFile?"#1a1a2e":"#e2e5ea",color:uploadFile?"#fff":"#94a3b8",fontSize:13,fontWeight:500,cursor:uploadFile?"pointer":"default",fontFamily:"inherit"}}>Upload & Assign to Me</button>
                </div>
              </div>
            </div>}
          </div>}

          {/* ASSIGN LEAD MODAL */}
          {assignLeadModal&&(()=>{const c=clients.find(x=>x.id===assignLeadModal);if(!c)return null;const lowerMembers=team.filter(m=>roleIdx(m.role)>=roleIdx(role)&&m.role!=="Client");return <div style={{position:"fixed",inset:0,background:"#00000040",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setAssignLeadModal(null)}>
            <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,padding:32,width:440,maxWidth:"90vw",boxShadow:"0 20px 60px #00000020"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}><h2 style={{margin:0,fontSize:18,fontWeight:700}}>Assign Lead</h2><button onClick={()=>setAssignLeadModal(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",padding:0}}><Ic t="x" s={18}/></button></div>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:"#fafbfc",borderRadius:10,marginBottom:18,border:"1px solid #eef0f2"}}>
                <Avatar src={c.photo} fallback={ini(c.name)} size={32}/>
                <div><div style={{fontSize:13,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{c.co} • <span style={{color:leadColor(c.lead)}}>{c.lead}</span></div></div>
              </div>
              <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,marginBottom:10}}>Assign to team member {roleIdx(role)<=1?"":"(your level & below)"}</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:280,overflowY:"auto",marginBottom:18}}>
                <button onClick={()=>{updateClient(c.id,"assignedTo",null);setAssignLeadModal(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,border:!c.assignedTo?"2px solid #1a1a2e":"1px solid #e2e5ea",background:!c.assignedTo?"#f0f2f5":"#fff",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"#f0f2f5",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic t="x" s={12}/></div>
                  <div><div style={{fontSize:13,fontWeight:!c.assignedTo?600:400,color:"#374151"}}>Unassigned</div><div style={{fontSize:11,color:"#94a3b8"}}>Remove assignment</div></div>
                </button>
                {lowerMembers.map(m=>{const isCur=c.assignedTo===m.id;return <button key={m.id} onClick={()=>{updateClient(c.id,"assignedTo",m.id);setAssignLeadModal(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,border:isCur?"2px solid #1a1a2e":"1px solid #e2e5ea",background:isCur?"#f0f2f5":"#fff",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                  <Avatar src={m.photo} fallback={m.avatar} color={roleBg(m.role)+"30"} size={28}/>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:isCur?600:400,color:"#374151"}}>{m.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{m.role} • {clients.filter(x=>x.assignedTo===m.id).length} lead{clients.filter(x=>x.assignedTo===m.id).length!==1?"s":""}</div></div>
                  {isCur&&<span style={{fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"#059669",color:"#fff"}}>Current</span>}
                </button>;})}
              </div>
            </div>
          </div>;})()}
          {!dialClient&&sel&&(()=>{const c=clients.find(x=>x.id===sel.id)||sel;const assignedAgent=c.assignedTo?team.find(m=>m.id===c.assignedTo):null;return <div>
            <Back label="Back" onClick={()=>setSel(null)}/>
            <Card style={{padding:"22px 26px",marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:14}}><PhotoAvatar src={c.photo} fallback={ini(c.name)} size={50} onClick={()=>handlePhoto(c.id,true)}/><div><h2 style={{margin:0,fontSize:19,fontWeight:700}}>{c.name}</h2><div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><span style={{fontSize:13,color:"#94a3b8"}}>{c.co}</span><LeadBadge lead={c.lead} size="md"/></div></div></div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setAssignLeadModal(c.id)} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151"}}><Ic t="assign" s={15}/>Assign</button>
                  <button onClick={()=>{if(c.lead!=="DNC")openDial(c);}} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:8,border:"none",background:c.lead==="DNC"?"#e2e5ea":"#1a1a2e",color:c.lead==="DNC"?"#94a3b8":"#fff",fontSize:13,fontWeight:500,cursor:c.lead==="DNC"?"not-allowed":"pointer",fontFamily:"inherit"}} title={c.lead==="DNC"?"DNC — Remove from DNC to dial":""}><Ic t="phone" s={15}/>{c.lead==="DNC"?"DNC":"Dial"}</button>
                  <button onClick={()=>{navigator.clipboard.writeText(c.em);setEmailCopied(true);setTimeout(()=>setEmailCopied(false),2000);}} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:8,border:"none",background:emailCopied?"#059669":"#3b5bdb",color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"background 0.2s"}}><Ic t="email" s={15}/>{emailCopied?"Copied!":"Email"}</button>
                  <button onClick={()=>openNewAppt(c.id)} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151"}}><Ic t="clock" s={15}/>Book Appt</button>
                </div>
              </div>
              {assignedAgent&&<div style={{display:"flex",alignItems:"center",gap:8,marginTop:14,paddingTop:14,borderTop:"1px solid #eef0f2"}}><span style={{fontSize:11,color:"#94a3b8",fontWeight:500}}>Assigned to</span><Avatar src={assignedAgent.photo} fallback={assignedAgent.avatar} color={roleBg(assignedAgent.role)+"30"} size={24}/><span style={{fontSize:13,fontWeight:600,color:"#374151"}}>{assignedAgent.name}</span><span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:10,background:roleBg(assignedAgent.role)+"15",color:roleBg(assignedAgent.role)}}>{assignedAgent.role}</span></div>}
              {!assignedAgent&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:14,paddingTop:14,borderTop:"1px solid #eef0f2"}}><span style={{fontSize:11,color:"#cbd5e1",fontWeight:500}}>Unassigned — click Assign to assign a team member</span></div>}
            </Card>
            <div style={{display:"flex",marginBottom:18,borderBottom:"1px solid #eef0f2"}}>{[["info","Info","users"],["notes","Notes","note"]].map(([k,l,ic])=>(<button key={k} onClick={()=>setTab(k)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",border:"none",background:"none",fontSize:13,fontFamily:"inherit",color:tab===k?"#1a1a2e":"#94a3b8",fontWeight:tab===k?600:400,borderBottom:tab===k?"2px solid #1a1a2e":"2px solid transparent",cursor:"pointer",marginBottom:-1}}><Ic t={ic} s={15}/>{l}</button>))}</div>
            {tab==="info"&&<Card style={{padding:"22px 26px"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"18px 36px"}}>{[["Full Name",c.name],["Company",c.co],["Email",c.em],["Phone",c.ph],["Status",c.st],["Tier",c.ti],["Lead",c.lead],["Assigned To",assignedAgent?assignedAgent.name:"Unassigned"],["Database",c.dest||"Main Database"],["List",c.listTag||"none"],["Last Contact",c.lc]].map(([l,v],i)=>(<div key={i}><div style={{fontSize:10.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600,marginBottom:3}}>{l}</div><div style={{fontSize:14,fontWeight:500}}>{l==="List"?<div style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}>{[{id:"none",name:"None",color:"#94a3b8"},...BUILT_IN_LISTS.filter(b=>b.id!=="dnc"),...customLists].map(lt=>(<button key={lt.id} onClick={()=>{const tag=lt.id==="none"?null:lt.id;setClients(p=>p.map(x=>x.id===c.id?{...x,listTag:tag}:x));setSel({...c,listTag:tag});}} style={{padding:"4px 10px",borderRadius:6,border:(c.listTag||"none")===lt.id?"1px solid "+lt.color:"1px solid #e2e5ea",background:(c.listTag||"none")===lt.id?lt.color+"18":"transparent",color:(c.listTag||"none")===lt.id?lt.color:"#94a3b8",fontSize:12,fontWeight:(c.listTag||"none")===lt.id?600:400,cursor:"pointer",fontFamily:"inherit"}}>{lt.name}</button>))}</div>:l==="Status"?<div style={{display:"flex",alignItems:"center",gap:4}}>{["Active","Pending","Inactive"].map(st=>(<button key={st} onClick={()=>{setClients(p=>p.map(x=>x.id===c.id?{...x,st}:x));setSel({...c,st});}} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:6,border:c.st===st?"1px solid "+stColor(st):"1px solid #e2e5ea",background:c.st===st?stColor(st)+"18":"transparent",color:c.st===st?stColor(st):"#94a3b8",fontSize:12,fontWeight:c.st===st?600:400,cursor:"pointer",fontFamily:"inherit"}}><span style={{width:6,height:6,borderRadius:"50%",background:c.st===st?stColor(st):"#e2e5ea"}}/>{st}</button>))}</div>:l==="Lead"?<div style={{display:"flex",alignItems:"center",gap:4}}>{["Hot","Warm","Cold","DNC"].map(ld=>(<button key={ld} onClick={()=>{setClients(p=>p.map(x=>x.id===c.id?{...x,lead:ld}:x));setSel({...c,lead:ld});}} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:6,border:c.lead===ld?"1px solid "+leadColor(ld):"1px solid #e2e5ea",background:c.lead===ld?leadBg(ld):"transparent",color:c.lead===ld?leadColor(ld):"#94a3b8",fontSize:12,fontWeight:c.lead===ld?600:400,cursor:"pointer",fontFamily:"inherit"}}><span style={{width:6,height:6,borderRadius:"50%",background:c.lead===ld?leadColor(ld):"#e2e5ea"}}/>{ld}</button>))}</div>:l==="Database"?<span style={{display:"inline-flex",alignItems:"center",gap:5}}><Ic t="db" s={13}/>{v}</span>:l==="Assigned To"&&assignedAgent?<span style={{display:"inline-flex",alignItems:"center",gap:6}}><Avatar src={assignedAgent.photo} fallback={assignedAgent.avatar} color={roleBg(assignedAgent.role)+"30"} size={20}/>{v}</span>:v}</div></div>))}</div></Card>}
            {tab==="info"&&<Card style={{padding:"22px 26px",marginTop:14}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:8,background:"#059669"+"18",display:"flex",alignItems:"center",justifyContent:"center",color:"#059669"}}><Ic t="dollar" s={14}/></div><span style={{fontSize:14,fontWeight:700}}>Sales</span><span style={{fontSize:11,color:"#94a3b8"}}>({(sales[c.id]||[]).length})</span>{(sales[c.id]||[]).filter(x=>x.recurring).length>0&&<span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:10,background:"#dbeafe",color:"#3b5bdb"}}>{(sales[c.id]||[]).filter(x=>x.recurring).length} recurring</span>}</div><button onClick={()=>setSaleModal({clientId:c.id})} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,border:"1px solid #e2e5ea",background:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",color:"#374151"}}><Ic t="plus" s={13}/>Add Sale</button></div>{(sales[c.id]||[]).map(s=>(<div key={s.id} style={{padding:"14px 0",borderTop:"1px solid #f0f2f5"}}><div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}><div style={{display:"flex",alignItems:"center",gap:10,flex:1,cursor:"pointer"}} onClick={()=>setSaleModal({clientId:c.id,sale:s})}><div style={{width:36,height:36,borderRadius:8,background:s.recurring?"#dbeafe":"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",color:s.recurring?"#3b5bdb":"#059669",flexShrink:0}}><Ic t={s.recurring?"signal":"dollar"} s={16}/></div><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.product||"Untitled Sale"}</div><div style={{display:"flex",alignItems:"center",gap:8,marginTop:3,flexWrap:"wrap"}}>{s.saleType&&<span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:6,background:"#f5f6f8",color:"#64748b"}}>{s.saleType}</span>}{s.quality&&<span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:6,background:"#f5f0ff",color:"#7c3aed"}}>{s.quality}</span>}{s.recurring&&<span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:6,background:"#dbeafe",color:"#3b5bdb"}}>{s.recurringFreq}</span>}</div><div style={{fontSize:10,color:"#94a3b8",marginTop:3}}>{s.d} · by {s.ag}</div></div></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2,flexShrink:0}}><span style={{fontSize:15,fontWeight:700,color:"#059669"}}>${(s.amt||0).toLocaleString()}</span><div style={{display:"flex",gap:8}}><span style={{fontSize:10,color:"#64748b"}}>Gross <strong style={{color:"#059669"}}>${(s.grossProfit||0).toLocaleString()}</strong></span><span style={{fontSize:10,color:"#64748b"}}>Net <strong style={{color:"#059669"}}>${(s.netProfit||0).toLocaleString()}</strong></span></div><button onClick={e=>{e.stopPropagation();setSales(p=>({...p,[c.id]:(p[c.id]||[]).filter(x=>x.id!==s.id)}));}} style={{padding:"3px 6px",borderRadius:5,border:"1px solid #fecaca",background:"#fff",cursor:"pointer",color:"#ef4444",fontSize:10,marginTop:4}}><Ic t="trash" s={10}/></button></div></div></div>))}{!(sales[c.id]||[]).length&&<div style={{textAlign:"center",padding:20,color:"#94a3b8",fontSize:12}}>No sales recorded.</div>}</Card>}
            {tab==="notes"&&<div>
              <Card style={{padding:"16px 20px",marginBottom:14}}><textarea placeholder="Add a note..." value={note} onChange={e=>setNote(e.target.value)} rows={3} style={{width:"100%",border:"1px solid #e2e5ea",borderRadius:8,padding:"10px 14px",fontSize:13,fontFamily:"inherit",resize:"vertical",outline:"none",boxSizing:"border-box"}}/><div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><button onClick={()=>{if(!note.trim())return;setNts(p=>({...p,[c.id]:[{id:Date.now(),d:new Date().toISOString().slice(0,10),a:team[0].name.split(" ")[0]+" "+team[0].name.split(" ")[1][0]+".",aRole:role,t:note.trim()},...(p[c.id]||[])]}));setNote("");}} style={{padding:"8px 18px",borderRadius:8,border:"none",background:"#1a1a2e",color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Save Note</button></div></Card>
              {!(nts[c.id]||[]).length&&<Card style={{textAlign:"center",padding:36,color:"#94a3b8",fontSize:14}}>No notes yet.</Card>}
              {(nts[c.id]||[]).map(n=>{const ce=canEditDeleteNote(role,n.aRole);return <Card key={n.id} style={{padding:"16px 20px",marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,fontWeight:600,color:"#3b5bdb"}}>{n.a}</span><span style={{fontSize:10,padding:"2px 6px",borderRadius:10,background:roleBg(n.aRole)+"15",color:roleBg(n.aRole),fontWeight:600}}>{n.aRole}</span></div><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,color:"#94a3b8"}}>{n.d}</span>{ce&&<button style={{padding:"2px 6px",borderRadius:4,border:"1px solid #e2e5ea",background:"#fff",fontSize:10,cursor:"pointer",color:"#64748b"}}><Ic t="edit" s={10}/></button>}{ce&&<button style={{padding:"2px 6px",borderRadius:4,border:"1px solid #fecaca",background:"#fff",fontSize:10,cursor:"pointer",color:"#ef4444"}}><Ic t="trash" s={10}/></button>}</div></div><div style={{fontSize:13.5,lineHeight:1.6,color:"#374151"}}>{n.t}</div></Card>;})}
            </div>}
          </div>})()}

          {/* SETTINGS */}
          {!dialClient&&sec==="acquisition"&&(()=>{
            const now2=new Date(2026,1,25);
            const aqRangeD={"1d":1,"7d":7,"1m":30,"3m":90,"6m":180,"12m":365,"custom":0,"all":9999}[kpiRange]||30;
            const aqStart=kpiRange==="custom"?(parseD(kpiFrom)||new Date(2020,0,1)):new Date(now2);if(kpiRange!=="custom")aqStart.setDate(aqStart.getDate()-aqRangeD);
            const aqStartStr=aqStart.toISOString().slice(0,10);
            const aqEndStr=kpiRange==="custom"?kpiTo:"2026-02-25";
            // Source analysis
            const DESTS=["Main Database","Inbound Leads","Outbound Leads","Event Contacts","Partner Referrals"];
            const destColors={"Main Database":"#3b5bdb","Inbound Leads":"#059669","Outbound Leads":"#0891b2","Event Contacts":"#f59e0b","Partner Referrals":"#7c3aed"};
            const srcData=DESTS.map(d=>{const dClients=clients.filter(c=>c.dest===d);const count=dClients.length;const converted=dClients.filter(c=>c.listTag==="sold").length;const rev=dClients.reduce((s,c)=>(s+(sales[c.id]||[]).filter(x=>x.d>=aqStartStr&&x.d<=aqEndStr).reduce((ss,x)=>ss+x.amt,0)),0);const convRate=count>0?Math.round(converted/count*100):0;return {name:d,color:destColors[d]||"#94a3b8",count,converted,rev,convRate};});
            const totalAcq=srcData.reduce((s,d)=>s+d.count,0);
            const totalConv=srcData.reduce((s,d)=>s+d.converted,0);
            const totalAcqRev=srcData.reduce((s,d)=>s+d.rev,0);
            // Lead temp funnel
            const leads=["Hot","Warm","Cold"];
            const leadColors={"Hot":"#ef4444","Warm":"#f59e0b","Cold":"#3b5bdb"};
            const leadData=leads.map(l=>{const lc=clients.filter(c=>c.lead===l);return {name:l,color:leadColors[l],count:lc.length,rev:lc.reduce((s,c)=>(s+(sales[c.id]||[]).filter(x=>x.d>=aqStartStr&&x.d<=aqEndStr).reduce((ss,x)=>ss+x.amt,0)),0)};});
            // New vs returning
            const newClients=clients.filter(c=>c.listTag==="new").length;
            const activeClients=clients.filter(c=>!c.listTag&&c.lead!=="DNC").length;
            const soldClients=clients.filter(c=>c.listTag==="sold").length;
            const pendingClients=clients.filter(c=>c.listTag==="pending").length;
            // Monthly trend
            const months=[];for(let i=5;i>=0;i--){const md=new Date(2026,1-i,1);months.push({label:md.toLocaleString("default",{month:"short"}),key:md.toISOString().slice(0,7)});}
            const monthData=months.map(m=>{const mClients=clients.filter(c=>{const cl=(cls[c.id]||[]);return cl.some(x=>x.d.startsWith(m.key));});return {...m,acquired:mClients.length,rev:clients.reduce((s,c)=>(s+(sales[c.id]||[]).filter(x=>x.d.startsWith(m.key)).reduce((ss,x)=>ss+x.amt,0)),0)};});
            const mMax=Math.max(...monthData.map(m=>m.acquired),1);
            const fmtR=v=>"$"+v.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0});
            // Pie helper
            const Pie3=({data,total,valueKey,fmt,size=160})=>{if(!total)return <div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",color:"#cbd5e1",fontSize:12}}>No data</div>;let cum=0;const slices=data.filter(d=>d[valueKey]>0).map(d=>{const pct=d[valueKey]/total;const start=cum;cum+=pct;return {...d,pct,start};});const r=size/2-4;const cx=size/2;const cy=size/2;const arc=(s0,e0)=>{const s=s0*2*Math.PI-Math.PI/2;const e=e0*2*Math.PI-Math.PI/2;const lg=e0-s0>0.5?1:0;return `M ${cx+r*Math.cos(s)} ${cy+r*Math.sin(s)} A ${r} ${r} 0 ${lg} 1 ${cx+r*Math.cos(e)} ${cy+r*Math.sin(e)} L ${cx} ${cy} Z`;};return <svg width={size} height={size}>{slices.length===1?<circle cx={cx} cy={cy} r={r} fill={slices[0].color}/>:slices.map((sl,i)=>sl.pct>0.001&&<path key={i} d={arc(sl.start,sl.start+sl.pct-0.003)} fill={sl.color} stroke="#fff" strokeWidth={2}/>)}<circle cx={cx} cy={cy} r={r*0.55} fill="#fff"/><text x={cx} y={cy-4} textAnchor="middle" fontSize={16} fontWeight="700" fill="#1a1a2e">{fmt(total)}</text><text x={cx} y={cy+10} textAnchor="middle" fontSize={9} fill="#94a3b8">Total</text></svg>;};
            const StatB=({label,value,sub,color,icon})=><Card style={{padding:"18px 22px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:32,height:32,borderRadius:8,background:color+"18",display:"flex",alignItems:"center",justifyContent:"center",color}}><Ic t={icon} s={16}/></div><span style={{fontSize:10.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,fontWeight:600}}>{label}</span></div><div style={{fontSize:26,fontWeight:700,color:"#1a1a2e"}}>{value}</div>{sub&&<div style={{fontSize:12,color:"#64748b",marginTop:2}}>{sub}</div>}</Card>;
            return <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg, #0891b2 0%, #3b5bdb 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><Ic t="target" s={16}/></div><h1 style={{fontSize:22,fontWeight:700,margin:0}}>Acquisition Statistics</h1><span style={{fontSize:11,color:"#94a3b8",fontWeight:500}}>{aqEntries.length} entries</span></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setAqHistoryOpen(true)} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,border:"1px solid #3b5bdb",background:"#f0f4ff",fontSize:12,fontWeight:600,color:"#3b5bdb",cursor:"pointer",fontFamily:"inherit"}}><Ic t="clock" s={13}/>History{aqHistory.length>0&&<span style={{fontSize:10,fontWeight:700,padding:"1px 5px",borderRadius:8,background:"#3b5bdb",color:"#fff",marginLeft:2}}>{aqHistory.length}</span>}</button>
                <button onClick={()=>{setAqModal(true);setAqTab("manual");setAqCsvText("");}} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,border:"1px solid #059669",background:"#f0fdf4",fontSize:12,fontWeight:600,color:"#059669",cursor:"pointer",fontFamily:"inherit"}}><Ic t="plus" s={13}/>Add Entry</button>
                <div style={{position:"relative"}}><button onClick={()=>setKpiDrop(!kpiDrop)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:8,border:kpiDrop?"2px solid #3b5bdb":"1px solid #e2e5ea",background:kpiDrop?"#f0f4ff":"#fff",fontSize:12,fontWeight:600,color:kpiDrop?"#3b5bdb":"#374151",cursor:"pointer",fontFamily:"inherit"}}><Ic t="clock" s={13}/>{kpiRange==="custom"?kpiFrom+" → "+kpiTo:{"1d":"1 Day","7d":"7 Days","1m":"1 Month","3m":"3 Months","6m":"6 Months","12m":"1 Year","all":"All Time"}[kpiRange]||"1 Month"}<span style={{transform:kpiDrop?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s",display:"inline-flex"}}><Ic t="chev" s={11}/></span></button>{kpiDrop&&<><div onClick={()=>{setKpiDrop(false);setKpiCustomView(false);}} style={{position:"fixed",inset:0,zIndex:98}}/><div style={{position:"absolute",top:"calc(100% + 4px)",right:0,width:kpiCustomView?340:200,background:"#fff",borderRadius:10,border:"1px solid #eef0f2",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:99}}>{!kpiCustomView&&<div style={{padding:4}}>{[["1d","1 Day"],["7d","7 Days"],["1m","1 Month"],["3m","3 Months"],["6m","6 Months"],["12m","1 Year"],["all","All Time"]].map(([k,l])=><button key={k} onClick={()=>{setKpiRange(k);setKpiDrop(false);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 12px",border:"none",background:kpiRange===k?"#f0f4ff":"transparent",color:kpiRange===k?"#3b5bdb":"#374151",fontSize:12,fontWeight:kpiRange===k?600:400,cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>{if(kpiRange!==k)e.currentTarget.style.background="#f8f9fb"}} onMouseLeave={e=>{if(kpiRange!==k)e.currentTarget.style.background="transparent"}}>{l}{kpiRange===k&&<Ic t="check" s={12}/>}</button>)}<div style={{borderTop:"1px solid #eef0f2",margin:"4px 0"}}/><button onClick={()=>setKpiCustomView(true)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 12px",border:"none",background:kpiRange==="custom"?"#f0f4ff":"transparent",color:kpiRange==="custom"?"#3b5bdb":"#374151",fontSize:12,fontWeight:kpiRange==="custom"?600:400,cursor:"pointer",fontFamily:"inherit",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#f8f9fb"} onMouseLeave={e=>e.currentTarget.style.background=kpiRange==="custom"?"#f0f4ff":"transparent"}>Custom Range<Ic t="chev" s={10}/></button></div>}{kpiCustomView&&<div style={{padding:16}}><button onClick={()=>setKpiCustomView(false)} style={{display:"flex",alignItems:"center",gap:4,border:"none",background:"none",color:"#64748b",fontSize:11,cursor:"pointer",fontFamily:"inherit",padding:0,marginBottom:12}}><span style={{transform:"rotate(180deg)",display:"inline-flex"}}><Ic t="chev" s={10}/></span>Back</button><div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Choose Date Range</div><div style={{display:"flex",gap:12,marginBottom:14}}><CalendarPicker value={kpiFrom} onChange={setKpiFrom} label="From"/><CalendarPicker value={kpiTo} onChange={setKpiTo} label="To"/></div><button onClick={()=>{setKpiRange("custom");setKpiDrop(false);setKpiCustomView(false);}} style={{width:"100%",padding:"8px 0",borderRadius:8,border:"none",background:"#3b5bdb",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Apply Range</button></div>}</div></>}</div>
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
                <StatB label="Total Leads" value={totalAcq} sub={DESTS.length+" sources"} color="#3b5bdb" icon="users"/>
                <StatB label="Converted" value={totalConv} sub={totalAcq>0?Math.round(totalConv/totalAcq*100)+"% conversion":"—"} color="#059669" icon="check"/>
                <StatB label="Revenue" value={fmtR(totalAcqRev)} sub="from all sources" color="#0891b2" icon="dollar"/>
                <StatB label="Avg Deal Size" value={totalConv>0?fmtR(Math.round(totalAcqRev/totalConv)):"—"} sub={totalConv+" deals closed"} color="#7c3aed" icon="target"/>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                <Card style={{padding:"22px 26px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Ic t="db" s={14}/><span style={{fontSize:14,fontWeight:700}}>Leads by Source</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:20}}>
                    <Pie3 data={srcData} total={totalAcq} valueKey="count" fmt={v=>String(v)}/>
                    <div style={{display:"flex",flexDirection:"column",gap:5,flex:1}}>{srcData.map(d=><div key={d.name} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/><span style={{fontSize:11,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span><span style={{fontSize:11,fontWeight:700,color:d.color}}>{d.count}</span></div>)}</div>
                  </div>
                </Card>
                <Card style={{padding:"22px 26px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Ic t="dollar" s={14}/><span style={{fontSize:14,fontWeight:700}}>Revenue by Source</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:20}}>
                    <Pie3 data={srcData.filter(d=>d.rev>0)} total={totalAcqRev} valueKey="rev" fmt={v=>fmtR(v)}/>
                    <div style={{display:"flex",flexDirection:"column",gap:5,flex:1}}>{srcData.filter(d=>d.rev>0).map(d=><div key={d.name} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/><span style={{fontSize:11,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span><span style={{fontSize:11,fontWeight:700,color:d.color}}>{fmtR(d.rev)}</span></div>)}</div>
                  </div>
                </Card>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                <Card style={{padding:"22px 26px"}}><div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Lead Temperature</div>
                  <div style={{display:"flex",alignItems:"center",gap:20}}>
                    <Pie3 data={leadData} total={leadData.reduce((s,d)=>s+d.count,0)} valueKey="count" fmt={v=>String(v)} size={140}/>
                    <div style={{flex:1}}>{leadData.map(d=><div key={d.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:8,marginBottom:4,background:d.color+"08"}}><div style={{width:10,height:10,borderRadius:"50%",background:d.color}}/><span style={{fontSize:12,fontWeight:600,flex:1}}>{d.name}</span><span style={{fontSize:13,fontWeight:700,color:d.color}}>{d.count}</span><span style={{fontSize:10,color:"#94a3b8"}}>{fmtR(d.rev)}</span></div>)}</div>
                  </div>
                </Card>
                <Card style={{padding:"22px 26px"}}><div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Conversion Funnel</div>
                  {srcData.sort((a,b)=>b.count-a.count).map(d=><div key={d.name} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,fontWeight:500}}>{d.name}</span><span style={{fontSize:11,fontWeight:700,color:d.color}}>{d.convRate}%</span></div><div style={{height:20,background:"#f5f6f8",borderRadius:6,overflow:"hidden",position:"relative"}}><div style={{height:"100%",background:d.color+"30",borderRadius:6,width:d.count>0?(d.count/Math.max(...srcData.map(x=>x.count))*100)+"%":"0%"}}><div style={{height:"100%",background:d.color,borderRadius:6,width:d.convRate+"%"}}/></div></div></div>)}
                </Card>
              </div>

              <Card style={{padding:"22px 26px"}}><div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Monthly Acquisition Trend</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:8,height:160,padding:"0 10px"}}>{monthData.map(m=><div key={m.key} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <span style={{fontSize:10,fontWeight:700,color:"#3b5bdb"}}>{m.acquired}</span>
                  <div style={{width:"100%",background:"#3b5bdb",borderRadius:6,height:Math.max(4,m.acquired/mMax*120),transition:"height 0.3s"}}/>
                  <span style={{fontSize:10,color:"#94a3b8",fontWeight:500}}>{m.label}</span>
                  <span style={{fontSize:9,color:"#059669",fontWeight:600}}>{fmtR(m.rev)}</span>
                </div>)}</div>
              </Card>

              {/* ── Acquisition Cost Entries ── */}
              {(()=>{const fltEntries=aqEntries.filter(e=>e.d>=aqStartStr&&e.d<=aqEndStr);const totCost=fltEntries.reduce((s,e)=>s+e.cost,0);const totLeads=fltEntries.reduce((s,e)=>s+e.leads,0);const avgCpl=totLeads>0?(totCost/totLeads):0;const stColors={active:"#059669",completed:"#3b5bdb",paused:"#f59e0b"};
              return <Card style={{overflow:"hidden",marginTop:20}}>
                <div style={{padding:"16px 22px",borderBottom:"1px solid #eef0f2",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}><Ic t="dollar" s={15}/><span style={{fontSize:14,fontWeight:700}}>Acquisition Costs & Services</span><span style={{fontSize:11,color:"#94a3b8"}}>{fltEntries.length} entries</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:16}}><span style={{fontSize:11,color:"#64748b"}}>Total Spend: <strong style={{color:"#ef4444"}}>{fmtR(totCost)}</strong></span><span style={{fontSize:11,color:"#64748b"}}>Leads: <strong style={{color:"#3b5bdb"}}>{totLeads}</strong></span><span style={{fontSize:11,color:"#64748b"}}>Avg CPL: <strong style={{color:"#7c3aed"}}>{fmtR(Math.round(avgCpl))}</strong></span></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"0.8fr 0.8fr 1.4fr 0.6fr 0.5fr 0.5fr 0.5fr 40px",padding:"8px 22px",fontSize:9.5,textTransform:"uppercase",letterSpacing:0.7,color:"#94a3b8",fontWeight:600,borderBottom:"1px solid #f5f6f8"}}><span>Date</span><span>Source</span><span>Service</span><span>Category</span><span style={{textAlign:"right"}}>Cost</span><span style={{textAlign:"right"}}>Leads</span><span style={{textAlign:"right"}}>CPL</span><span/></div>
                {fltEntries.sort((a,b)=>b.d.localeCompare(a.d)).map(e=>(<div key={e.id} style={{display:"grid",gridTemplateColumns:"0.8fr 0.8fr 1.4fr 0.6fr 0.5fr 0.5fr 0.5fr 40px",padding:"11px 22px",borderBottom:"1px solid #f8f9fb",alignItems:"center",fontSize:12}}>
                  <span style={{color:"#94a3b8",fontFamily:"monospace",fontSize:11}}>{e.d}</span>
                  <span style={{fontWeight:600}}>{e.source}</span>
                  <span style={{color:"#374151",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.service}</span>
                  <span style={{fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:6,background:"#f5f6f8",color:"#64748b",justifySelf:"start"}}>{e.category}</span>
                  <span style={{textAlign:"right",fontWeight:700,color:"#ef4444"}}>${e.cost.toLocaleString()}</span>
                  <span style={{textAlign:"right",fontWeight:600,color:"#3b5bdb"}}>{e.leads}</span>
                  <span style={{textAlign:"right",fontWeight:600,color:"#7c3aed"}}>${Math.round(e.cpl)}</span>
                  <button onClick={()=>setAqEntries(p=>p.filter(x=>x.id!==e.id))} style={{padding:2,border:"none",background:"transparent",cursor:"pointer",color:"#cbd5e1",justifySelf:"center"}}><Ic t="trash" s={12}/></button>
                </div>))}
                {!fltEntries.length&&<div style={{padding:30,textAlign:"center",color:"#94a3b8",fontSize:13}}>No entries in selected date range.</div>}
              </Card>;})()}
            </div>;
          })()}

