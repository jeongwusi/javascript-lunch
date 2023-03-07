import { OPTION_VALUES } from '../constant/optionValues';
import Restaurants from '../model/Restaurants';
import { RestaurantValues, Category, Distance, State } from '../types/restaurantTypes';
import Component from './Component';

export default class Modal extends Component {
  restaurants: Restaurants;

  constructor($target: HTMLElement, restaurants: Restaurants, state: State) {
    super($target);
    this.restaurants = restaurants;
    this.$state = state;
  }

  template() {
    return `
      <!-- 음식점 추가 모달 -->
	    <div class="modal modal--open">
	      <div class="modal-backdrop"></div>
	      <div class="modal-container">
	        <h2 class="modal-title text-title">새로운 음식점</h2>
	        <form>
	
	          <!-- 카테고리 -->
	          <div class="form-item form-item--required">
	            <label for="category text-caption">카테고리</label>
	            <select name="category" id="category" required>
	              <option value="">선택해 주세요</option>
	              <option value=${OPTION_VALUES.KOREAN}>한식</option>
	              <option value=${OPTION_VALUES.CHINESE}>중식</option>
	              <option value=${OPTION_VALUES.JAPANESE}>일식</option>
	              <option value=${OPTION_VALUES.WESTERN}>양식</option>
	              <option value=${OPTION_VALUES.ASIAN}>아시안</option>
	              <option value=${OPTION_VALUES.ETC}>기타</option>
	            </select>
	          </div>
	
	          <!-- 음식점 이름 -->
	          <div class="form-item form-item--required">
	            <label for="name text-caption">이름</label>
	            <input type="text" name="name" id="name" required>
	          </div>
	
	          <!-- 거리 -->
	          <div class="form-item form-item--required">
	            <label for="distance text-caption">거리(도보 이동 시간) </label>
	            <select name="distance" id="distance" required>
	              <option value="">선택해 주세요</option>
	              <option value="5">5분 내</option>
	              <option value="10">10분 내</option>
	              <option value="15">15분 내</option>
	              <option value="20">20분 내</option>
	              <option value="30">30분 내</option>
	            </select>
	          </div>
	
	          <!-- 설명 -->
	          <div class="form-item">
	            <label for="description text-caption">설명</label>
	            <textarea name="description" id="description" cols="30" rows="5"></textarea>
	            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
	          </div>
	
	          <!-- 링크 -->
	          <div class="form-item">
	            <label for="link text-caption">참고 링크</label>
	            <input type="text" name="link" id="link">
	            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
	          </div>
	
	          <!-- 취소/추가 버튼 -->
	          <div class="button-container">
	            <button type="button" class="button button--secondary text-caption">취소하기</button>
	            <button class="button button--primary text-caption">추가하기</button>
	          </div>
	        </form>
	      </div>
	    </div>
	    `;
  }

  render(): void {
    this.$target.insertAdjacentHTML('beforeend', this.template());
    this.listenEvent();
  }

  listenEvent() {
    this.$target.querySelector('.button--primary')?.addEventListener('click', (event: Event) => {
      event.preventDefault();

      const categoryElement = this.$target.querySelector<HTMLSelectElement>('#category');
      const category: Category | undefined = categoryElement ? (categoryElement.value as Category) : undefined;

      const nameElement = this.$target.querySelector<HTMLInputElement>('#name');
      const name: string = nameElement ? nameElement.value : '';

      const distanceElement = this.$target.querySelector<HTMLSelectElement>('#distance');
      const distance: Distance | undefined = distanceElement ? (Number(distanceElement.value) as Distance) : undefined;

      const descriptionElement = this.$target.querySelector<HTMLTextAreaElement>('#description');
      const description = descriptionElement ? descriptionElement.value : '';

      const linkElement = this.$target.querySelector<HTMLInputElement>('#link');
      const link = linkElement ? linkElement.value : '';

      if (!category || !name || !distance) {
        alert('카테고리, 이름, 거리는 필수 입력 정보 입니다!');
        return;
      }

      const restaurant: RestaurantValues = {
        name,
        category,
        distance,
        description,
        link,
      };

      this.restaurants.add(restaurant);
      this.$state.restaurants = this.restaurants.restaurantsList;

      localStorage.setItem('state', JSON.stringify(this.$state));

      window.location.reload();
    });

    const button = this.$target.querySelector('.button--secondary') as HTMLElement | null;

    if (button) {
      button.addEventListener('click', () => {
        this.closeModal();
      });
    }
  }

  closeModal() {
    const elementToRemove = this.$target.querySelector('.modal--open');

    if (elementToRemove) {
      elementToRemove.remove();
    }
  }
}
