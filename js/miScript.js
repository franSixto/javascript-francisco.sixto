// FORMATEO DE FECHAS Y HORAS
function formatDate(date) {
    return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ].join('/');
  }

function formatHours(date) {
    return [
        date.getHours(),
        date.getMinutes(),
    ].join(':');
}

//CREO EQUIPOS
function CrearEquipo (nombre, group, groupRank, flag) {
    this.nombre = nombre;
    this.group = group;
    this.groupRank = groupRank;
    this.flag = "./flags/" + group + "/" + flag;
}

// CREO PARTIDOS
function CrearPartido (id, Local, Visitante, dia, hora, resultado=[0, 0]) {
    this.id = id;
    this.Local = Local;
    this.Visitante = Visitante;
    this.dia = dia;
    this.hora = hora;
    this.resultado = resultado;
    
    this.resultadoPartido = function resultado (){
        console.log("El resultado fue: ", this.Local.nombre, " = ", this.resultado[0]," | ", this.Visitante.nombre, " = ", this.resultado[1])
    }
    this.cargarResultado = function (A, B){
        this.resultado = [A, B]
    }
}



function botonhover (boton) {
    boton.classList.add ("counter-hover");

}

function botonout (boton) {
    boton.classList.remove("counter-hover")
}

function botonclick (boton) {
boton.classList.add("click");
}

function botonup (boton) {
    boton.classList.remove("click");
    }

function sumar (boton) {
    let localscore = boton.id.split("-") [2]
    let contadorId = boton.id.split("-") [0] + "-" + localscore
    const Contador = document.getElementById(contadorId)
    const nuevoValor = parseInt(Contador.innerHTML)+ 1
    Contador.innerHTML = nuevoValor
    let grupo = boton.getAttribute("data-info").split(" ")[0]
    let partidoID = boton.getAttribute("data-info").split(" ")[1]
    partidoID += ` ${grupo}`
    let indicePartido = localscore === "visitante" ? 1:0
    let nombreGrupo = `Grupo ${grupo}` // Grupo A, Grupo B, etc
    let EnfrentamientosActualizados = window.Enfrentamientos.map(enfrentamiento => {
        let elem = enfrentamiento
        let partidos = []
        if(elem.grupo === nombreGrupo) {
            partidos = elem.partidos.map(partido => {
                if(partido.id === partidoID) {
                    let nuevosResultados = partido.resultado || [0, 0]
                    // console.log(nuevosResultados)
                    nuevosResultados[indicePartido] = nuevoValor
                    return {...partido, resultado: nuevosResultados}
                }
                return partido
            })
        }
        console.log({...elem, partidos})
        return {...elem, partidos}
    })
    window.Enfrentamientos = EnfrentamientosActualizados
    // console.log(EnfrentamientosActualizados)
}

function restar (boton) {
    let localscore = boton.id.split("-") [2]
    let contadorId = boton.id.split("-") [0] + "-" + localscore
    const Contador = document.getElementById(contadorId)
    const nuevoValor = parseInt(Contador.innerHTML)- 1
    if (parseInt(Contador.innerHTML) === 0 ) return 
    Contador.innerHTML = nuevoValor
    let grupo = boton.getAttribute("data-info").split(" ")[0]
    let partidoID = boton.getAttribute("data-info").split(" ")[1]
    partidoID += ` ${grupo}`
    let indicePartido = localscore === "visitante" ? 1:0
    let nombreGrupo = `Grupo ${grupo}` // Grupo A, Grupo B, etc
    let EnfrentamientosActualizados = window.Enfrentamientos.map(enfrentamiento => {
        let elem = enfrentamiento
        let partidos = []
        if(elem.grupo === nombreGrupo) {
            partidos = elem.partidos.map(partido => {
                if(partido.id === partidoID) {
                    let nuevosResultados = partido.resultado || [0, 0]
                    // console.log(nuevosResultados)
                    nuevosResultados[indicePartido] = nuevoValor
                    return {...partido, resultado: nuevosResultados}
                }
                return partido
            })
        }
        console.log({...elem, partidos})
        return {...elem, partidos}
    })
    window.Enfrentamientos = EnfrentamientosActualizados
}


async function main () {
    // window.addEventListener("load", () => {
    //     const enfrentamientosPrevios = JSON.parse(localStorage.getItem("Enfrentamientos"))
    //     if(enfrentamientosPrevios) Enfrentamientos = enfrentamientosPrevios
    // })
    document.getElementById("AgregarPronostico").addEventListener("click", () => {
        window.Swal.fire({
            showDenyButton: true,
            title: 'Confirmar resultados',
            text: 'Estás a punto de cargar los resultados ¿Desea continuar?',
            icon: 'info',
            confirmButtonText: 'Si, continuar',
            denyButtonText: 'Cancelar',        
          })
          .then(result => {
            if (result.isConfirmed){
                window.Enfrentamientos = Enfrentamientos
                const EnfrentamientosValores = JSON.stringify(Enfrentamientos)
                localStorage.removeItem("Enfrentamientos")
                localStorage.setItem("Enfrentamientos", EnfrentamientosValores)
            } 
          })

    })
    let EQUIPOS_DATA = []
    const res = await fetch('../json/teams.json')
    const data = await res.json()
    EQUIPOS_DATA = data.equipos
    
    var Equipos = []

   EQUIPOS_DATA.map((equipo) => {
        let Equipo = new CrearEquipo(
            equipo.nombre_equipo, 
            equipo.grupo,
            equipo.posicion, 
            equipo.img
        )
        Equipos.push (Equipo)
    })

    // console.log(Equipos)

    //EQUIPOS POR GRUPOS
    const cantidadEquiposPorGrupo = 4 
    // const cantidadPartidos = (cantidadEquiposPorGrupo * cantidadEquiposPorGrupo - 1) / 2

    let partidosGrupoA = [] 
    let partidosGrupoB = []
    let partidosGrupoC = []
    let partidosGrupoD = []
    let partidosGrupoE = []
    let partidosGrupoF = []
    let partidosGrupoG = []
    let partidosGrupoH = []

    for (let i = 0; i < cantidadEquiposPorGrupo -1; i++){
        const local = i
        for (let j = 1 + i; j < cantidadEquiposPorGrupo; j++ ){
            const fecha = new Date()
            partidosGrupoA.push (new CrearPartido (`${i}${j} A`, Equipos[i],Equipos[j],formatDate(fecha), formatHours(fecha)))
            partidosGrupoB.push (new CrearPartido (`${i}${j} B`, Equipos[i+4],Equipos[j+4],formatDate(fecha), formatHours(fecha)))
            partidosGrupoC.push (new CrearPartido (`${i}${j} C`, Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
            partidosGrupoD.push (new CrearPartido (`${i}${j} D`, Equipos[i+12],Equipos[j+12],formatDate(fecha), formatHours(fecha)))
            partidosGrupoE.push (new CrearPartido (`${i}${j} E`, Equipos[i+16],Equipos[j+16],formatDate(fecha), formatHours(fecha)))
            partidosGrupoF.push (new CrearPartido (`${i}${j} F`, Equipos[i+20],Equipos[j+20],formatDate(fecha), formatHours(fecha)))
            partidosGrupoG.push (new CrearPartido (`${i}${j} G`, Equipos[i+24],Equipos[j+24],formatDate(fecha), formatHours(fecha)))
            partidosGrupoH.push (new CrearPartido (`${i}${j} H`, Equipos[i+28],Equipos[j+28],formatDate(fecha), formatHours(fecha)))
        }
    }

    let container = document.getElementById ("container")
    let Enfrentamientos = [
        {grupo: "Grupo A", partidos:partidosGrupoA},
        {grupo: "Grupo B", partidos:partidosGrupoB},
        {grupo: "Grupo C", partidos:partidosGrupoC},
        {grupo: "Grupo D", partidos:partidosGrupoD},
        {grupo: "Grupo E", partidos:partidosGrupoE},
        {grupo: "Grupo F", partidos:partidosGrupoF},
        {grupo: "Grupo G", partidos:partidosGrupoG},
        {grupo: "Grupo H", partidos:partidosGrupoH},
    ]

    const enfrentamientosPrevios = JSON.parse(localStorage.getItem("Enfrentamientos"))
    if(enfrentamientosPrevios) Enfrentamientos = enfrentamientosPrevios

    window.Enfrentamientos = Enfrentamientos
        
        
    function CrearGrupos () {
        let Cardlist = ""
        for (let elemento of Enfrentamientos){
            
            let Contadorpartidos = 0
            for (let partido of elemento.partidos){
                // console.log(elemento.grupo)
                Contadorpartidos ++
                Cardlist +=
                `<div class="card">
                    <div class="partido">
                        <div class="cardPosition">
                            <div class="cardHeader p-b2">
                                <div class="cardDiv"> 
                                    <h2 class="cardTitle p-y dateLeft bold">${elemento.grupo}</h2>
                                    <p>Partido ${Contadorpartidos} de ${elemento.partidos.length}</p>
                                </div>
                                <div>
                                    <div class="p-y dateRight">Inicia</div>
                                    <div class="dateRight"><strong>${partido.dia + " " + partido.hora}</strong></div>
                                </div>             
                            </div>
                        <div class="partidoRivales p-y4">
                            <div class="Local">
                                <div class="teamInfo">
                                    <img class="team" src="${partido.Local.flag}" alt="Equipo1">
                                    <h3 class="p-y3 teamNombre">${partido.Local.nombre}</h3>
                                    <div class="contador">
                                    <div class="counter-container">
                                        <button class="counter" data-info="${partido.Local.group} ${partido.id}" onmousedown="botonclick(this)" onmouseover="botonhover(this)" onmouseout="botonout(this)" onmouseup="botonup(this)" onclick="restar(this)" id="${partido.id}-menos-local">-</button>
                                    </div>  
                                        <h3 id="${partido.id}-local" class="p-y3 teamScore">${partido.resultado[0]}</h3>
                                    <div class="counter-container">
                                        <button class="counter" data-info="${partido.Local.group} ${partido.id}" onmousedown="botonclick(this)" onmouseover="botonhover(this)" onmouseout="botonout(this)" onmouseup="botonup(this)" onclick="sumar(this)" id="${partido.id}-mas-local">+</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="vs">VS</div>
                            <div class="Visitante">
                                <div class="teamInfo">
                                    <img class="team" src="${partido.Visitante.flag}" alt="Equipo2">
                                    <h3 class="p-y3 teamNombre">${partido.Visitante.nombre}</h3>
                                    <div class="contador">
                                        <div class="counter-container">
                                            <button class="counter" data-info="${partido.Visitante.group} ${partido.id}" onmousedown="botonclick(this)" onmouseover="botonhover(this)" onmouseout="botonout(this)" onmouseup="botonup(this)" onclick="restar(this)" id="${partido.id}-menos-visitante">-</button>
                                        </div>
                                        <h3 id="${partido.id}-visitante" class="p-y3 teamScore">${partido.resultado[1]}</h3>
                                        <div class="counter-container">
                                        <button class="counter" data-info="${partido.Visitante.group} ${partido.id}" onmousedown="botonclick(this)" onmouseover="botonhover(this)" onmouseout="botonout(this)" onmouseup="botonup(this)" onclick="sumar(this)" id="${partido.id}-mas-visitante">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""></div>
                        </div>
                    </div>
                </div>`
                

                // console.log(partido)   
            }
            container.innerHTML = Cardlist         
        }
    }

    CrearGrupos()

}


main()