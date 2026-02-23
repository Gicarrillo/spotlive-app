import React from "react";
export default function HistoryPanel({history,onPick,onClear}){
    return(
        <div style={{padding:12,border:"1px solid #f7f4f4",borderRadius:10, background:"#c5d3d3"}}>
            <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",marginBottom: 16}}>
                <h3 style={{marginTop:0,color:"#0b1622"}}>Historial</h3>
                {history.length>0 && (
                    <button onClick={onClear} style={{borderRadius:"10px", background:"#6e2d0f",color:"white", border:"1px solid #becae2", padding:"6px",fontSize:"13px"}}>Vaciar</button>
                )}
            </div>
            {history.length===0?(
                <div style={{opacity:0.8, color:"#0b1622"}}>Aún no hay búsquedas.</div>
            ):(
                <ul style={{margin:0, paddingLeft:18}}>
                    {history.map((h,idx)=>(
                        <li key={idx} style={{marginBottom:8, color:"#c9cccc"}}>
                            <button onClick={()=>onPick(h.term)} style={{cursor:"pointer", background:"#265e4b",border:"1px solid #fff6a4", textAlign:"left", borderRadius:"18px",padding:"13px", color:"white"}}>
                                <span style={{fontWeight:"bold"}}>{h.term}</span><span style={{marginLeft:"8px",fontSize:12,opacity:0.8}}>({new Date(h.time).toLocaleString()})</span>
                            </button>{" "}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}