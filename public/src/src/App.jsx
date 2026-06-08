import { useState, useEffect } from "react";

const C = {
  bg:          "#dad6d3",
  surface:     "#ccc8c4",
  card:        "#c8c4c0",
  cardInner:   "#bfbbb7",
  text:        "#1a1614",
  muted:       "#928473",
  faint:       "rgba(146,132,115,0.2)",
  faintBorder: "rgba(146,132,115,0.3)",
  red:         "#6c2924",
  redDim:      "rgba(108,41,36,0.1)",
  redBorder:   "rgba(108,41,36,0.25)",
  lime:        "#d7d499",
  limeDim:     "rgba(215,212,153,0.25)",
  limeBorder:  "rgba(215,212,153,0.5)",
};

const WORKOUTS = [
  {
    id: "lower-a", label: "LOWER A", tag: "Posterior · Glúteo", num: "01",
    exercises: [
      { name: "Agachamento Livre", sets: 4, reps: "6–8", rest: "2–3 min", muscle: "Quadríceps · Glúteo · Core",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/agachamento-livre-com-barra-nas-costas.gif",
        youtube: "https://www.youtube.com/results?search_query=agachamento+livre+execucao+correta",
        tips: ["Desça até o quadril paralelo ao chão ou abaixo","Joelhos na direção dos pés, sem colapsar","Barra sobre os trapézios, peito erguido","Calcanhar firme no chão o tempo todo"],
        avoid: ["Não arredonde a lombar","Não deixe os joelhos colapsarem para dentro","Não suba na ponta dos pés"] },
      { name: "Leg Press 45°", sets: 3, reps: "10–12", rest: "90 seg", muscle: "Quadríceps · Glúteo",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/leg-press-45.gif",
        youtube: "https://www.youtube.com/results?search_query=leg+press+45+execucao+correta",
        tips: ["Pés na largura dos ombros ou levemente mais afastados","Desça até ~90° no joelho","Não trave os joelhos no topo"],
        avoid: ["Não deixe o glúteo sair do banco ao descer","Não posicione os pés muito baixos"] },
      { name: "Stiff Barra", sets: 4, reps: "8–10", rest: "90 seg", muscle: "Isquiotibiais · Glúteo · Lombar",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/stiff-convencional.gif",
        youtube: "https://www.youtube.com/results?search_query=stiff+barra+execucao+correta",
        tips: ["Hinge no quadril — não é agachamento","Sinta o alongamento dos isquiotibiais","Barra próxima ao corpo","Coluna neutra do início ao fim"],
        avoid: ["Não arredonde as costas","Não flexione demais os joelhos"] },
      { name: "Cadeira Flexora", sets: 3, reps: "10–12", rest: "60 seg", muscle: "Isquiotibiais",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/mesa-flexora.gif",
        youtube: "https://www.youtube.com/results?search_query=cadeira+flexora+execucao+correta",
        tips: ["Controle a descida — fase excêntrica é a mais importante","Quadril apoiado no banco o tempo todo"],
        avoid: ["Não jogue o quadril pra cima","Não dê impulso"] },
      { name: "Hip Thrust c/ Barra", sets: 4, reps: "10–12", rest: "90 seg", muscle: "Glúteo máximo",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/01/hip-thrust-com-barra.gif",
        youtube: "https://www.youtube.com/results?search_query=hip+thrust+barra+execucao",
        tips: ["Omoplatas apoiadas no banco, queixo direcionado ao peito","Squeeze máximo no glúteo no topo por 1s","Pés na largura do quadril, levemente virados para fora"],
        avoid: ["Não hiperesstenda a lombar no topo","Fixe o banco antes de começar"] },
      { name: "Panturrilha em Pé", sets: 4, reps: "15–20", rest: "60 seg", muscle: "Gastrocnêmio · Sóleo",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/elevacao-de-panturrilha-em-pe.gif",
        youtube: "https://www.youtube.com/results?search_query=panturrilha+em+pe+execucao",
        tips: ["Suba até a amplitude máxima","Desça além do plano dos pés","Pausa de 1s no topo"],
        avoid: ["Não execute em velocidade — panturrilha responde ao tempo sob tensão"] },
    ]
  },
  {
    id: "push", label: "PUSH", tag: "Ombro · Tríceps · Core", num: "02",
    exercises: [
      { name: "Desenvolvimento Halteres", sets: 4, reps: "8–10", rest: "90 seg", muscle: "Deltóide · Trapézio superior",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/desenvolvimento-com-halteres.gif",
        youtube: "https://www.youtube.com/results?search_query=desenvolvimento+halteres+ombro+execucao",
        tips: ["Cotovelos levemente à frente do plano frontal","Sobe até quase travar — sem travar completamente","Postura ereta — não deixe o tronco ceder"],
        avoid: ["Não arquee as costas","Não use impulso do quadril"] },
      { name: "Elevação Lateral", sets: 3, reps: "12–15", rest: "60 seg", muscle: "Deltóide medial",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/elevacao-lateral-com-halteres.gif",
        youtube: "https://www.youtube.com/results?search_query=elevacao+lateral+execucao+correta",
        tips: ["Leve inclinação do tronco à frente (10–15°)","Imagine que está despejando água ao subir","Sobe até a altura dos ombros"],
        avoid: ["Não balance o tronco","Não suba acima dos ombros"] },
      { name: "Face Pull", sets: 3, reps: "15", rest: "60 seg", muscle: "Deltóide post. · Manguito · Trapézio",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/face-pull-com-corda.gif",
        youtube: "https://www.youtube.com/results?search_query=face+pull+corda+execucao+correta",
        tips: ["Polia na altura dos olhos ou acima","Cotovelos abertos e acima dos ombros","Rotação externa — mãos apontam para cima","Essencial para saúde do ombro e postura na corrida"],
        avoid: ["Não use carga pesada","Não deixe os cotovelos caírem"] },
      { name: "Tríceps Corda", sets: 3, reps: "12–15", rest: "60 seg", muscle: "Tríceps — cabeça lateral",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/triceps-na-polia-com-corda.gif",
        youtube: "https://www.youtube.com/results?search_query=triceps+corda+polia+execucao",
        tips: ["Abre a corda no final — maximiza a contração","Cotovelos fixos ao lado do tronco"],
        avoid: ["Não jogue o tronco para frente"] },
      { name: "Tríceps Francês", sets: 3, reps: "10–12", rest: "60 seg", muscle: "Tríceps — cabeça longa",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/triceps-frances-com-halteres.gif",
        youtube: "https://www.youtube.com/results?search_query=triceps+frances+halter+execucao",
        tips: ["Cotovelos apontando para o teto, sem abrir","Amplitude completa"],
        avoid: ["Não mova os cotovelos — só o antebraço"] },
      { name: "Prancha com Elevação de Braço", sets: 3, reps: "10 cada lado", rest: "60 seg", muscle: "Core anti-rotação · Glúteo · Estabilizadores",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/02/prancha-com-elevacao-de-braco.gif",
        youtube: "https://www.youtube.com/results?search_query=prancha+elevacao+braco+execucao",
        tips: ["Quadril completamente estável — não deixe rotar ao levantar o braço","Core contraído o tempo todo","Movimento lento e controlado","Diretamente transferível para estabilidade na corrida"],
        avoid: ["Não deixe o quadril abrir para o lado","Não prenda a respiração"] },
      { name: "Pallof Press", sets: 3, reps: "12 cada lado", rest: "60 seg", muscle: "Core anti-rotação · Oblíquos · Transverso",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/02/pallof-press.gif",
        youtube: "https://www.youtube.com/results?search_query=pallof+press+execucao+correta",
        tips: ["Fique de lado para a polia","Empurre e estenda os braços resistindo à rotação","Mantenha a posição por 1–2s com braços estendidos","Um dos melhores exercícios de core para corredores"],
        avoid: ["Não deixe o tronco rotar em direção à polia","Não use carga pesada — o objetivo é estabilidade"] },
      { name: "Dead Bug", sets: 3, reps: "8 cada lado", rest: "60 seg", muscle: "Core profundo · Transverso · Coordenação",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/02/dead-bug.gif",
        youtube: "https://www.youtube.com/results?search_query=dead+bug+exercicio+core+execucao",
        tips: ["Lombar pressionada contra o chão o tempo todo","Movimento oposto: braço direito + perna esquerda","Expire ao estender, inspire ao voltar","Treina a dissociação quadril-tronco — fundamental para a corrida"],
        avoid: ["Não deixe a lombar sair do chão em nenhum momento","Não prenda a respiração","Não acelere — controle é tudo aqui"] },
    ]
  },
  {
    id: "pull", label: "PULL", tag: "Costas · Bíceps", num: "03",
    exercises: [
      { name: "Barra Fixa", sets: 4, reps: "6–8", rest: "2–3 min", muscle: "Latíssimo · Bíceps · Rombóides",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/barra-fixa-pronada.gif",
        youtube: "https://www.youtube.com/results?search_query=barra+fixa+pronada+execucao+correta",
        tips: ["Depressão escapular antes de puxar","Queixo passa a barra no topo","Desce com controle até extensão completa"],
        avoid: ["Sem kipping","Não encolha os ombros no topo"] },
      { name: "Remada Curvada Barra", sets: 4, reps: "8–10", rest: "90 seg", muscle: "Latíssimo · Rombóides · Bíceps",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/remada-curvada-pronada.gif",
        youtube: "https://www.youtube.com/results?search_query=remada+curvada+barra+execucao",
        tips: ["Tronco a ~45°, coluna neutra","Barra em direção ao umbigo","Retração escapular no topo — segura 1s"],
        avoid: ["Não arredonde as costas","Não use o lombar para balançar"] },
      { name: "Puxada Frente Neutra", sets: 3, reps: "10–12", rest: "90 seg", muscle: "Latíssimo · Bíceps",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/puxada-pela-frente-pegada-neutra.gif",
        youtube: "https://www.youtube.com/results?search_query=puxada+frente+pegada+neutra+execucao",
        tips: ["Leve inclinação do tronco para trás ao puxar","Puxe até a clavícula"],
        avoid: ["Não jogue o tronco excessivamente","Sem impulso"] },
      { name: "Remada Unilateral Halter", sets: 3, reps: "10–12", rest: "60 seg", muscle: "Latíssimo · Rombóide · Bíceps",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/remada-unilateral-com-halteres.gif",
        youtube: "https://www.youtube.com/results?search_query=remada+unilateral+halter+execucao",
        tips: ["Cotovelo sobe alto — acima da linha das costas","Pausa de 1s no topo com contração"],
        avoid: ["Não torça excessivamente o tronco","Não deixe o ombro cair ao descer"] },
      { name: "Face Pull", sets: 3, reps: "15", rest: "60 seg", muscle: "Deltóide post. · Manguito · Trapézio",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/face-pull-com-corda.gif",
        youtube: "https://www.youtube.com/results?search_query=face+pull+corda+execucao+correta",
        tips: ["Polia na altura dos olhos ou acima","Cotovelos abertos e acima dos ombros","Rotação externa — mãos apontam para cima"],
        avoid: ["Não use carga pesada","Não deixe os cotovelos caírem"] },
      { name: "Rosca Direta Barra", sets: 3, reps: "10–12", rest: "60 seg", muscle: "Bíceps braquial",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/rosca-direta-com-barra.gif",
        youtube: "https://www.youtube.com/results?search_query=rosca+direta+barra+execucao+correta",
        tips: ["Cotovelos fixos ao lado do tronco","Supinação completa no topo"],
        avoid: ["Não balance o tronco","Não mova os cotovelos para frente"] },
      { name: "Rosca Martelo", sets: 3, reps: "12", rest: "60 seg", muscle: "Bíceps · Braquial · Braquiorradial",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/rosca-martelo-alternada.gif",
        youtube: "https://www.youtube.com/results?search_query=rosca+martelo+execucao+correta",
        tips: ["Pegada neutra (polegar para cima) o tempo todo"],
        avoid: ["Não vire o punho — mantém neutro do início ao fim"] },
    ]
  },
  {
    id: "lower-b", label: "LOWER B", tag: "Anterior · Funcional", num: "04",
    exercises: [
      { name: "Agachamento Goblet", sets: 3, reps: "10–12", rest: "90 seg", muscle: "Quadríceps · Glúteo · Core",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/agachamento-goblet-com-halter.gif",
        youtube: "https://www.youtube.com/results?search_query=agachamento+goblet+execucao+correta",
        tips: ["Halter/kettlebell na altura do peito","Cotovelos afastam os joelhos no fundo","Desça profundo"],
        avoid: ["Não colapse o tronco à frente","Joelhos não entram para dentro"] },
      { name: "Avanço com Halteres", sets: 3, reps: "10 cada", rest: "90 seg", muscle: "Quadríceps · Glúteo · Equilíbrio",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/afundo-alternado-com-halteres.gif",
        youtube: "https://www.youtube.com/results?search_query=afundo+avanço+halteres+execucao",
        tips: ["Tronco ereto, passo largo","Joelho traseiro quase toca o chão","Joelho da frente não passa a ponta do pé"],
        avoid: ["Não incline o tronco à frente","Não impacte o joelho no chão"] },
      { name: "Leg Extension", sets: 3, reps: "12–15", rest: "60 seg", muscle: "Quadríceps",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/cadeira-extensora.gif",
        youtube: "https://www.youtube.com/results?search_query=cadeira+extensora+execucao+correta",
        tips: ["Extensão completa no topo — contração por 1s","Descida controlada em 2–3 segundos"],
        avoid: ["Não trave com impacto","Sem momentum"] },
      { name: "Mesa Flexora", sets: 3, reps: "12", rest: "60 seg", muscle: "Isquiotibiais",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/mesa-flexora-2.gif",
        youtube: "https://www.youtube.com/results?search_query=mesa+flexora+execucao+correta",
        tips: ["Quadril pressionado contra o banco","Descida controlada"],
        avoid: ["Não levante o quadril para subir o peso"] },
      { name: "Abdutor", sets: 3, reps: "15", rest: "60 seg", muscle: "Glúteo médio · Abdutores",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/abdutor-na-maquina.gif",
        youtube: "https://www.youtube.com/results?search_query=abdutor+maquina+execucao+correta",
        tips: ["Movimento lento e controlado","Pausa de 1s no topo","Glúteo médio forte previne lesões de joelho na corrida"],
        avoid: ["Carga pesada demais compromete a ativação"] },
      { name: "Prancha + Crunch", sets: 3, reps: "—", rest: "60 seg", muscle: "Core · Reto abdominal · Transverso",
        gif: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/prancha-abdominal.gif",
        youtube: "https://www.youtube.com/results?search_query=prancha+crunch+abdominal+execucao",
        tips: ["Prancha: 30–45s, glúteo contraído e lombar neutra","Crunch: 15–20 reps, expiração na contração"],
        avoid: ["Quadril não sobe nem desce na prancha","Não puxe o pescoço no crunch"] },
    ]
  }
];

const SEQUENCE = ["lower-a", "push", "pull", "lower-b"];

function getSt(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function setSt(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

const IcoBack = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoDown = ({ open }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform: open?"rotate(180deg)":"none", transition:"transform 0.22s"}}><polyline points="6 9 12 15 18 9"/></svg>;
const IcoYT = () => <svg width="14" height="14" viewBox="0 0 24 24" fill={C.red}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#dad6d3"/></svg>;

function ExCard({ ex, exIdx, sessData, onSet, open, onToggle }) {
  const [src, setSrc] = useState(ex.gif || "");
  const [dead, setDead] = useState(false);

  return (
    <div style={{ borderRadius:12, background:open?"rgba(0,0,0,0.06)":"rgba(0,0,0,0.04)", border:`1px solid ${open?C.faintBorder:"rgba(0,0,0,0.08)"}`, overflow:"hidden", transition:"all 0.2s" }}>
      <div onClick={onToggle} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", cursor:"pointer" }}>
        <div style={{ width:52, height:52, borderRadius:9, overflow:"hidden", flexShrink:0, background:C.surface }}>
          {!dead
            ? <img src={src} alt={ex.name} onError={() => setDead(true)} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
          }
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:0.8, color:C.text, lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {ex.name.toUpperCase()}
          </div>
          <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{ex.sets} séries · {ex.reps} reps · {ex.rest}</div>
        </div>
        <div style={{ color:C.muted, flexShrink:0 }}><IcoDown open={open} /></div>
      </div>

      {open && (
        <div style={{ padding:"0 14px 16px" }}>
          <div style={{ display:"inline-flex", background:C.limeDim, border:`1px solid ${C.limeBorder}`, borderRadius:20, padding:"3px 10px", fontSize:11, color:"#5a5630", marginBottom:14 }}>
            {ex.muscle}
          </div>
          <a href={ex.youtube} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(108,41,36,0.06)", border:`1px solid ${C.redBorder}`, borderRadius:9, padding:"9px 12px", marginBottom:14, textDecoration:"none", color:C.red, fontSize:12 }}>
            <IcoYT /> Ver execução no YouTube
          </a>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:8, textTransform:"uppercase" }}>Dicas</div>
            {ex.tips.map((t,i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                <span style={{ color:C.red, fontSize:9, marginTop:4, flexShrink:0 }}>▸</span>
                <span style={{ fontSize:12, color:"#3a3028", lineHeight:1.55 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:8, textTransform:"uppercase" }}>Evitar</div>
            {ex.avoid.map((a,i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                <span style={{ color:C.muted, fontSize:9, marginTop:4, flexShrink:0 }}>×</span>
                <span style={{ fontSize:12, color:C.muted, lineHeight:1.55 }}>{a}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"rgba(0,0,0,0.05)", borderRadius:10, padding:"10px 12px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"22px 1fr 1fr", gap:8, marginBottom:6 }}>
              <span/>
              <div style={{ fontSize:9, color:C.muted, letterSpacing:2, textTransform:"uppercase", textAlign:"center" }}>kg</div>
              <div style={{ fontSize:9, color:C.muted, letterSpacing:2, textTransform:"uppercase", textAlign:"center" }}>reps</div>
            </div>
            {Array.from({ length: ex.sets }).map((_,si) => (
              <div key={si} style={{ display:"grid", gridTemplateColumns:"22px 1fr 1fr", gap:8, alignItems:"center", padding:"5px 0", borderBottom: si < ex.sets-1 ? `1px solid rgba(0,0,0,0.06)` : "none" }}>
                <span style={{ fontSize:11, color:C.muted, textAlign:"center", fontFamily:"monospace" }}>{si+1}</span>
                {["kg","reps"].map(f => (
                  <input key={f} type="number" placeholder={f}
                    value={sessData?.[exIdx]?.[si]?.[f] || ""}
                    onChange={e => onSet(exIdx, si, f, e.target.value)}
                    style={{ background:"rgba(255,255,255,0.5)", border:`1px solid rgba(0,0,0,0.1)`, borderRadius:7, color:C.text, padding:"7px 8px", fontSize:13, width:"100%", outline:"none", fontFamily:"'Barlow',sans-serif", boxSizing:"border-box", textAlign:"center" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutView({ workout, onFinish, onBack }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [sets, setSets] = useState({});
  const [mins, setMins] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSet = (ei, si, f, v) => setSets(p => ({ ...p, [ei]:{ ...(p[ei]||{}), [si]:{ ...(p[ei]?.[si]||{}), [f]:v } } }));

  const save = () => {
    const h = getSt("workout_history", []);
    setSt("workout_history", [{ id:Date.now(), workoutId:workout.id, workoutLabel:workout.label, date:new Date().toISOString(), minutes:parseInt(mins)||null, note, sets }, ...h]);
    setSaved(true);
    setTimeout(onFinish, 650);
  };

  const inputStyle = { width:"100%", background:"rgba(255,255,255,0.5)", border:`1px solid rgba(0,0,0,0.1)`, borderRadius:10, color:C.text, padding:"11px 14px", fontSize:14, outline:"none", fontFamily:"'Barlow',sans-serif", boxSizing:"border-box" };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'Barlow',sans-serif", paddingBottom:80 }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:`linear-gradient(180deg, ${C.bg} 80%, transparent)`, padding:"20px 20px 8px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:11, letterSpacing:1.5, textTransform:"uppercase", padding:0, marginBottom:16 }}>
          <IcoBack /> voltar
        </button>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:4, color:C.muted, fontWeight:600, textTransform:"uppercase", marginBottom:2 }}>Training</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:46, color:C.text, lineHeight:0.9, letterSpacing:2 }}>{workout.label}</div>
            <div style={{ fontSize:12, color:C.muted, marginTop:5, fontWeight:300 }}>{workout.tag}</div>
          </div>
          <div style={{ textAlign:"right", fontSize:11, color:C.muted, lineHeight:1.7 }}>
            {new Date().toLocaleDateString("pt-BR",{weekday:"short"}).toUpperCase()}<br/>
            <span style={{ fontSize:13 }}>{new Date().toLocaleDateString("pt-BR",{day:"numeric",month:"short"})}</span>
          </div>
        </div>
      </div>

      <div style={{ padding:"10px 16px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:24 }}>
          {workout.exercises.map((ex,i) => (
            <ExCard key={i} ex={ex} exIdx={i} sessData={sets} onSet={handleSet} open={openIdx===i} onToggle={() => setOpenIdx(openIdx===i?null:i)} />
          ))}
        </div>

        <div style={{ background:"rgba(0,0,0,0.05)", border:`1px solid rgba(0,0,0,0.07)`, borderRadius:14, padding:18 }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:14, textTransform:"uppercase" }}>Finalizar treino</div>
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:11, color:C.muted, marginBottom:5 }}>Duração (min)</div>
            <input type="number" value={mins} onChange={e=>setMins(e.target.value)} placeholder="ex: 55" style={inputStyle}/>
          </div>
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:11, color:C.muted, marginBottom:5 }}>Observação</div>
            <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Como foi o treino?" rows={2} style={{ ...inputStyle, resize:"none" }}/>
          </div>
          <button onClick={save} disabled={saved}
            style={{ width:"100%", background:saved?"rgba(215,212,153,0.3)":C.red, border:saved?`1px solid ${C.limeBorder}`:"none", borderRadius:11, color:saved?"#5a5630":"#f0ece6", fontFamily:"'Bebas Neue',sans-serif", fontSize:19, letterSpacing:2.5, padding:"14px", cursor:saved?"default":"pointer", transition:"all 0.3s" }}>
            {saved ? "SALVO" : "SALVAR TREINO"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressView({ onBack }) {
  const history = getSt("workout_history", []);
  const total = history.length;
  const thisWeek = history.filter(h => new Date(h.date) >= new Date(Date.now()-7*864e5)).length;
  const freq = {}; WORKOUTS.forEach(w => { freq[w.id]=0; }); history.forEach(h => { if(freq[h.workoutId]!==undefined) freq[h.workoutId]++; });
  const maxF = Math.max(...Object.values(freq),1);
  const maxes = {};
  history.forEach(s => {
    const w = WORKOUTS.find(x=>x.id===s.workoutId);
    if(!w||!s.sets) return;
    w.exercises.forEach((ex,ei) => {
      const es=s.sets[ei]; if(!es) return;
      Object.values(es).forEach(sv => { const kg=parseFloat(sv.kg); if(!isNaN(kg)&&kg>0&&(!maxes[ex.name]||kg>maxes[ex.name].max)) maxes[ex.name]={max:kg,date:s.date}; });
    });
  });

  const sec = { background:"rgba(0,0,0,0.05)", border:`1px solid rgba(0,0,0,0.07)`, borderRadius:14, padding:16, marginBottom:12 };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'Barlow',sans-serif", paddingBottom:80 }}>
      <div style={{ padding:"20px 20px 10px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:11, letterSpacing:1.5, textTransform:"uppercase", padding:0, marginBottom:16 }}>
          <IcoBack /> voltar
        </button>
        <div style={{ fontSize:10, letterSpacing:4, color:C.muted, fontWeight:600, marginBottom:2, textTransform:"uppercase" }}>Training</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:46, letterSpacing:2, lineHeight:0.9 }}>Progresso</div>
      </div>

      <div style={{ padding:"16px 16px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
          {[{l:"Total de treinos",v:total},{l:"Essa semana",v:thisWeek}].map((s,i)=>(
            <div key={i} style={{ ...sec, marginBottom:0, textAlign:"center", padding:"18px 14px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:C.red, lineHeight:1 }}>{s.v}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={sec}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:14, textTransform:"uppercase" }}>Frequência por treino</div>
          {WORKOUTS.map(w=>(
            <div key={w.id} style={{ marginBottom:11 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1 }}>{w.label}</span>
                <span style={{ fontSize:12, color:C.muted }}>{freq[w.id]}×</span>
              </div>
              <div style={{ height:3, background:"rgba(0,0,0,0.1)", borderRadius:2 }}>
                <div style={{ height:"100%", background:C.red, borderRadius:2, width:`${(freq[w.id]/maxF)*100}%`, transition:"width 0.6s cubic-bezier(0.16,1,0.3,1)" }}/>
              </div>
            </div>
          ))}
        </div>

        <div style={sec}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:14, textTransform:"uppercase" }}>Records de carga</div>
          {Object.keys(maxes).length===0
            ? <div style={{ fontSize:13, color:C.muted, textAlign:"center", padding:"20px 0", fontWeight:300 }}>Registre seus treinos para ver os records</div>
            : Object.entries(maxes).sort((a,b)=>b[1].max-a[1].max).map(([name,d])=>(
              <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid rgba(0,0,0,0.06)` }}>
                <span style={{ fontSize:12, color:"#3a3028", fontWeight:300 }}>{name}</span>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, color:C.red }}>{d.max} kg</div>
                  <div style={{ fontSize:10, color:C.muted }}>{new Date(d.date).toLocaleDateString("pt-BR")}</div>
                </div>
              </div>
            ))
          }
        </div>

        {history.length>0 && (
          <div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:10, textTransform:"uppercase" }}>Histórico recente</div>
            {history.slice(0,10).map(h=>(
              <div key={h.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 14px", background:"rgba(0,0,0,0.04)", border:`1px solid rgba(0,0,0,0.06)`, borderRadius:10, marginBottom:6 }}>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:1 }}>{h.workoutLabel}</div>
                  {h.note && <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{h.note}</div>}
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:C.muted }}>{new Date(h.date).toLocaleDateString("pt-BR")}</div>
                  {h.minutes && <div style={{ fontSize:11, color:C.muted }}>{h.minutes}min</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [activeWkt, setActiveWkt] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    const l=document.createElement("link");
    l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:ital,wght@0,300;0,400;0,600;1,300&display=swap";
    document.head.appendChild(l);
    l.onload=()=>setReady(true);
    setTimeout(()=>setReady(true),900);
  },[]);

  const history = getSt("workout_history",[]);
  const lastId = history[0]?.workoutId;
  const nextIdx = lastId ? (SEQUENCE.indexOf(lastId)+1)%SEQUENCE.length : 0;
  const next = WORKOUTS.find(w=>w.id===SEQUENCE[nextIdx]);

  if(view==="workout"&&activeWkt) return <WorkoutView workout={activeWkt} onFinish={()=>{setView("home");setActiveWkt(null);}} onBack={()=>setView("home")}/>;
  if(view==="progress") return <ProgressView onBack={()=>setView("home")}/>;

  const ff = ready ? "'Barlow',sans-serif" : "sans-serif";

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:ff }}>
      <div style={{ padding:"52px 22px 28px", borderBottom:`1px solid rgba(0,0,0,0.08)` }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:10, letterSpacing:6, color:C.muted, marginBottom:6, textTransform:"uppercase" }}>Training</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:72, lineHeight:0.85, letterSpacing:1, color:C.text }}>TRAINING</div>
        <div style={{ fontSize:12, color:C.muted, marginTop:12, fontWeight:300 }}>
          {new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}
        </div>
      </div>

      <div style={{ padding:"22px 16px 80px" }}>
        <div onClick={()=>{setActiveWkt(next);setView("workout");}}
          style={{ background:"rgba(0,0,0,0.05)", border:`1px solid rgba(0,0,0,0.08)`, borderRadius:18, padding:22, marginBottom:22, cursor:"pointer", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-8, top:-24, fontFamily:"'Bebas Neue',sans-serif", fontSize:140, color:"rgba(0,0,0,0.04)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>
            {next.num}
          </div>
          <div style={{ fontSize:9, letterSpacing:3, color:C.muted, marginBottom:8, textTransform:"uppercase", fontWeight:600 }}>próximo treino</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:56, color:C.text, lineHeight:0.88, letterSpacing:2, marginBottom:4 }}>{next.label}</div>
          <div style={{ fontSize:13, color:C.muted, fontWeight:300, marginBottom:20 }}>{next.tag}</div>
          <div style={{ display:"flex", gap:6, marginBottom:22, flexWrap:"wrap" }}>
            {next.exercises.slice(0,4).map((ex,i)=>(
              <div key={i} style={{ background:"rgba(0,0,0,0.06)", border:`1px solid rgba(0,0,0,0.07)`, borderRadius:20, padding:"4px 10px", fontSize:11, color:C.muted }}>
                {ex.name.split(" ")[0]}
              </div>
            ))}
            {next.exercises.length>4&&<div style={{ background:"rgba(0,0,0,0.04)", borderRadius:20, padding:"4px 10px", fontSize:11, color:"rgba(146,132,115,0.6)" }}>+{next.exercises.length-4}</div>}
          </div>
          <div style={{ background:C.red, borderRadius:11, color:"#f0ece6", fontFamily:"'Bebas Neue',sans-serif", fontSize:19, letterSpacing:2.5, padding:"13px", textAlign:"center" }}>
            INICIAR TREINO
          </div>
        </div>

        <div style={{ fontSize:9, fontWeight:700, letterSpacing:2.5, color:C.muted, marginBottom:10, textTransform:"uppercase" }}>Todos os treinos</div>
        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:22 }}>
          {WORKOUTS.map(w=>{
            const isNext=w.id===next.id;
            return (
              <div key={w.id} onClick={()=>{setActiveWkt(w);setView("workout");}}
                style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 16px", background:isNext?"rgba(108,41,36,0.07)":"rgba(0,0,0,0.04)", border:`1px solid ${isNext?C.redBorder:"rgba(0,0,0,0.07)"}`, borderRadius:11, cursor:"pointer" }}>
                <div style={{ width:36, height:36, borderRadius:8, flexShrink:0, background:isNext?C.redDim:"rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:12, color:isNext?C.red:C.muted, letterSpacing:1 }}>
                  {w.num}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:15, letterSpacing:0.8, color:isNext?C.text:"#6a5a4a" }}>{w.label}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{w.tag}</div>
                </div>
                {isNext&&<div style={{ fontSize:9, color:C.red, letterSpacing:1.5, textTransform:"uppercase", fontWeight:700, background:C.redDim, border:`1px solid ${C.redBorder}`, borderRadius:20, padding:"3px 8px" }}>próximo</div>}
              </div>
            );
          })}
        </div>

        <button onClick={()=>setView("progress")}
          style={{ width:"100%", background:"rgba(0,0,0,0.05)", border:`1px solid rgba(0,0,0,0.08)`, borderRadius:11, color:C.muted, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:2, padding:"14px", cursor:"pointer", textTransform:"uppercase" }}>
          Ver progresso
        </button>
      </div>
    </div>
  );
}
