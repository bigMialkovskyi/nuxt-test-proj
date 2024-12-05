<template>
  <div
    class="bg-beige py-8 px-4 h-screen md:flex md:justify-center md:items-center"
  >
    <div class="max-w-screen-lg mx-auto">
      <div
        class="flex flex-col h-screen justify-center md:flex-row md:items-center p-5 md:h-52 md:p-0"
      >
        <div
          class="flex flex-wrap flex-col md:flex-row-reverse md:items-center justify-around md:flex-nowrap md:w-2/5"
        >
          <div
            class="flex flex-wrap w-full md:w-2/5 mb-6 md:mb-0 justify-around"
          >
            <a
              href="#"
              class="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-white mb-6 md:mr-4"
            >
              <i class="fab fa-instagram fa-2x"></i>
            </a>
            <a
              href="#"
              class="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center"
            >
              <i class="fa-brands fa-x-twitter fa-2x"></i>
            </a>
            <a
              href="#"
              class="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center"
            >
              <i class="fa-brands fa-square-facebook fa-2x"></i>
            </a>
            <a
              href="#"
              class="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center"
            >
              <i class="fab fa-vk fa-2x"></i>
            </a>
          </div>
          <div
            class="w-full flex flex-row md:w-3/5 justify-around md:flex-col-reverse"
          >
            <div>
              <h3 class="text-blue-600 text-sm font-semibold">
                Электронная почта
              </h3>
              <a
                href="mailto:email@gmail.com"
                class="text-gray-700 text-xs"
                >email@gmail.com</a
              >
            </div>
            <div class="md:mb-6">
              <h3 class="text-blue-600 text-sm font-semibold">Телефон</h3>
              <a
                href="tel:+1234567"
                class="text-gray-700 text-xs"
                >123-45-67</a
              >
            </div>
          </div>
        </div>
        <div
          class="flex flex-col space-y-4 my-6 md:my-0 md:w-3/5 md:justify-between md:h-32"
        >
          <div class="flex flex-col md:flex-row md:justify-around">
            <input
              v-model="firstName"
              v-bind="firstNameAttrs"
              type="text"
              placeholder="Ваше имя"
              :class="[
                'text-xs mt-6 w-full p-3 border rounded-full focus:outline-none md:mt-0 md:w-56',
                errors?.firstName && 'border-red-500',
              ]"
            />
            <input
              v-model="phoneNumber"
              v-bind="phoneNumberAttrs"
              type="tel"
              placeholder="Ваш телефон"
              :class="[
                'text-xs mt-6 w-full p-3 border rounded-full focus:outline-none md:mt-0 md:w-56',
                errors?.phoneNumber && 'border-red-500',
              ]"
            />
          </div>
          <div
            class="flex flex-col md:flex-row-reverse md:justify-around text-xs"
          >
            <p class="w-56 mb-6 text-gray-600 text-center md:text-left md:mb-0">
              Наш менеджер свяжется с вами в течение дня
            </p>
            <button
              @click="register()"
              class="w-56 bg-red-400 text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50"
            >
              Записаться
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import * as yup from "yup";
import { to } from "@utils/to";
import { useForm } from "vee-validate";
import { useNotificationStore } from "@stores/notifications";

const notificationStore = useNotificationStore();
const processing = ref<boolean>(false);
const schema = yup.object({
  phoneNumber: yup.string().min(7).max(12).required(),
  firstName: yup.string().min(3).max(20).required(),
});
const { values, errors, defineField } = useForm({
  validationSchema: schema,
});
const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber", {
  validateOnModelUpdate: false,
});
const [firstName, firstNameAttrs] = defineField("firstName", {
  validateOnModelUpdate: false,
});
const isReqDisabled = computed(() => {
  if (Object.keys(errors.value).length || processing.value) {
    return true;
  }
});

async function register() {
  if (!phoneNumber.value || !firstName.value) {
    notificationStore.addNotification({
      type: "error",
      message: "Not all fields are filled in.",
    });
    return;
  }

  if (isReqDisabled.value) {
    if (processing.value) {
      notificationStore.addNotification({
        type: "info",
        message: "Request in processing, please wait",
      });
    }

    if (Object.keys(errors.value).length) {
      notificationStore.addNotification({
        type: "error",
        message: errors.value?.phoneNumber || errors.value?.firstName || "",
      });
    }
    return;
  }

  processing.value = true;

  const [error, response] = await to(
    axios.get("https://jsonplaceholder.typicode.com/posts/1")
  );

  if (error || !response?.data) {
    processing.value = false;
    notificationStore.addNotification({
      type: "error",
      message: "Oops, something went wrong. Try again later.",
    });
    return;
  }

  notificationStore.addNotification({
    type: "success",
    message: `User name: ${firstName.value}\nPhone number: ${phoneNumber.value}\nMessage title: ${response.data.title}`,
  });

  processing.value = false;
}
</script>

<style>
.bg-beige {
  background-color: #fdf6e4;
}
</style>
