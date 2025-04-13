document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carousel')
  const images = [
    'imgs/carrousel-1.jpg',
    'imgs/carrousel-2.jpg',
    'imgs/carrousel-3.jpg',
    'imgs/carrousel-4.jpg',
  ]

  let currentIndex = 0
  const img = carousel.querySelector('img')

  function changeImage() {
    img.classList.replace('opacity-100', 'opacity-0')

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length
      img.src = images[currentIndex]

      img.classList.replace('opacity-0', 'opacity-100')
    }, 1000)
  }

  setInterval(changeImage, 4500)
})


fetch('https://integracao.cardapioweb.com/api/menu/company/profile?company=bolos_di_sofi&hostname=app.oxemenu.com.br')
  .then(response => response.json())
  .catch(error => console.error(error))

  
  const diasSemanaPT = {
    sunday: "Domingo",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado"
  }

  const diaDaSemanaHoje = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()

  async function getBusinessHours() {
    try {
      const response = await fetch('https://integracao.cardapioweb.com/api/menu/company/profile?company=bolos_di_sofi&hostname=app.oxemenu.com.br')
      const data = await response.json()
      const businessHours = data.business_hours

      const hojeHorario = businessHours[diaDaSemanaHoje]

      const container = document.getElementById('horario-funcionamento')
      const agendamento = document.getElementById('agendamento')
      if (hojeHorario && hojeHorario.length > 0) {
        const [abertura, fechamento] = hojeHorario[0]
        const dataAgora = new Date()
        const horaAgora = dataAgora.getHours() + (dataAgora.getMinutes() / 60)
        if (horaAgora < parseInt(abertura.split(':')[0])) {
          agendamento.innerHTML = `<p>Disponivel para agendamento</p>`
        }}
      if (hojeHorario && hojeHorario.length > 0) {
        const [abertura, fechamento] = hojeHorario[0]
        container.innerHTML = `<p>Hoje ${diasSemanaPT[diaDaSemanaHoje]} Aberto das: ${abertura} às ${fechamento}</p>`
      } 
     
        else {
        
        const dias = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        let diaAtualIndex = dias.indexOf(diaDaSemanaHoje)
        let proximoDia, horarios

        for (let i = 1; i <= 7; i++) {
          const index = (diaAtualIndex + i) % 7
          const dia = dias[index]
          if (businessHours[dia] && businessHours[dia].length > 0) {
            proximoDia = dia
            horarios = businessHours[dia][0]
            break
          }
        }

        const [aberturaProxima] = horarios
        container.innerHTML = `<p>Apenas agendamento: Abriremos ${diasSemanaPT[proximoDia]} às ${aberturaProxima}</p>`
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error)
    }
  }

  getBusinessHours()