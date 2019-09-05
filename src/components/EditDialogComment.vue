<template>
  <div>
    <v-dialog v-model="editDialog" width="500" persistent>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Edit</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Page Comment Editing</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="50"
                  label="Author"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="text"
                  :error-messages="textErrors"
                  required
                  @input="$v.text.$touch()"
                  @blur="$v.text.$touch()"
                  label="Text of Comment"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="blue darken-1"
            text
            :disabled="$v.$invalid"
            type="submit"
            @click="onEditComment"
            >Edit</v-btn
          >
          <v-btn color="blue darken-1" @click="cancel" text>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <InfoDialog :dialog="dialog" @clicked="onClickChild"></InfoDialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import InfoDialog from "@/components/InfoDialog";
export default {
  mixins: [validationMixin],
  props: ["loadedComment"],
  components: {
    InfoDialog
  },
  validations: {
    name: { required, maxLength: maxLength(50) },
    text: { required, maxLength: maxLength(5000) }
  },
  data() {
    return {
      name: this.loadedComment.author,
      text: this.loadedComment.text,
      editDialog: false,
      dialog: false
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be not less 50 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    textErrors() {
      const errors = [];
      if (!this.$v.text.$dirty) return errors;
      !this.$v.text.maxLength &&
        errors.push("Text must be not less 5000 characters long");
      !this.$v.text.required && errors.push("Text is required.");
      return errors;
    }
  },

  methods: {
    cancel() {
      this.$v.$reset();
      this.editDialog = false;
      this.dialog = false;
    },
    onEditComment() {
      const comment = {
        id: this.loadedComment.id,
        author: this.name,
        text: this.text
      };
      const payload = { comment, postId: this.$route.params.id.slice(1) };
      this.$store.dispatch("editComment", payload);
      this.dialog = true;
      this.editDialog = false;
    },
    onClickChild(val) {
      this.dialog = val;
    }
  }
};
</script>
