import RegisterRestaurantModal from './modal/RegisterRestaurantModal';
import RestaurantList from './restaurant/RestaurantList';
import SearchRestaurantSection from './section/SearchRestaurantSection';
import Header from './header/Header';
import RestaurantItem from './shared/RestaurantItem';
import Modal from './shared/Modal';
import Button from './shared/Button';
import FormItem from './shared/FormItem';
import Input from './shared/Input';
import Select from './shared/Select';
import Textarea from './shared/Textarea';

export type CustomRestaurantListElement = RestaurantList;

export type CustomSelectElement = Select;

export type CustomRegisterRestaurantModalElement = RegisterRestaurantModal;

export default {
  RegisterRestaurantModal,
  RestaurantItem,
  RestaurantList,
  SearchRestaurantSection,
  Header,
  Modal,
  Button,
  FormItem,
  Input,
  Select,
  Textarea,
};