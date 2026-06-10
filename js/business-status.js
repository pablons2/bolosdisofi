/**
 * Business Status - Horário de Funcionamento
 * Integração com API CardapioWeb
 */

class BusinessStatus {
  constructor() {
    this.apiUrl = 'https://integracao.cardapioweb.com/api/menu/company/profile?company=bolos_di_sofi&hostname=app.oxemenu.com.br';
    this.diasSemana = {
      sunday: 'Domingo',
      monday: 'Segunda-feira',
      tuesday: 'Terça-feira',
      wednesday: 'Quarta-feira',
      thursday: 'Quinta-feira',
      friday: 'Sexta-feira',
      saturday: 'Sábado'
    };
  }

  async init() {
    const statusBar = document.getElementById('status-bar');
    if (!statusBar) {
      console.warn('Status bar element not found');
      return;
    }

    try {
      const data = await this.fetchData();
      this.updateUI(data);
    } catch (error) {
      console.error('Erro ao carregar status:', error);
      this.showOffline();
    }
  }

  async fetchData() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    return response.json();
  }

  checkIsOpen(hours) {
    if (!hours || hours.length === 0) return false;

    const now = new Date();
    const currentHour = now.getHours() + (now.getMinutes() / 60);
    const [open, close] = hours[0];
    const openHour = parseInt(open.split(':')[0]);
    const closeHour = parseInt(close.split(':')[0]);

    return currentHour >= openHour && currentHour < closeHour;
  }

  updateUI(data) {
    const businessHours = data?.business_hours;
    if (!businessHours) {
      this.showOffline();
      return;
    }

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = businessHours[today];
    const isOpen = this.checkIsOpen(todayHours);

    this.renderStatus(isOpen, todayHours, today);
  }

  renderStatus(isOpen, hours, today) {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    const hoursText = document.getElementById('hours-text');

    if (!dot || !text) return;

    // Update status dot
    dot.className = 'status-dot';
    if (isOpen) {
      dot.classList.add('open');
    } else {
      dot.classList.add('closed');
    }

    // Update status text
    text.textContent = isOpen 
      ? 'Estamos atendendo agora' 
      : 'Disponível para agendamento';

    // Update hours text
    if (hoursText) {
      if (hours && hours.length > 0) {
        hoursText.textContent = `Hoje: ${hours[0][0]} às ${hours[0][1]}`;
      } else {
        // Find next open day
        const nextDay = this.findNextOpenDay(today, data?.business_hours);
        if (nextDay) {
          hoursText.textContent = `Abriremos ${nextDay.day} às ${nextDay.time}`;
        }
      }
    }
  }

  findNextOpenDay(currentDay, businessHours) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentIndex = days.indexOf(currentDay);

    for (let i = 1; i <= 7; i++) {
      const index = (currentIndex + i) % 7;
      const day = days[index];
      if (businessHours[day] && businessHours[day].length > 0) {
        return {
          day: this.diasSemana[day],
          time: businessHours[day][0][0]
        };
      }
    }
    return null;
  }

  showOffline() {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    const hoursText = document.getElementById('hours-text');

    if (dot) dot.style.background = '#9CA3AF';
    if (text) text.textContent = 'Verifique no WhatsApp';
    if (hoursText) hoursText.textContent = 'Horário indisponível';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const businessStatus = new BusinessStatus();
    businessStatus.init();
  });
} else {
  const businessStatus = new BusinessStatus();
  businessStatus.init();
}
