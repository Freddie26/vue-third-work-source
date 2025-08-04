import { defineStore } from "pinia";
import { useUsersStore } from "@/store/users";
import { commentsService } from "@/services";

export const useCommentsStore = defineStore(
  "comments",
  {
    state: () => ({
      comments: [],
    }),
    getters: {
      getCommentsByTaskId: (state) => taskId => {
        const usersStore = useUsersStore()
        return state.comments
          .filter(comment => comment.taskId === taskId)
          .map(comment =>
            ({
              ...comment,
              user: usersStore.findUserById(comment.userId)
            })
          )
      }
    },
    actions: {
      async fetchComments () {
        this.comments = await commentsService.fetchComments()
      },
      async addComment (comment) {
        const newComment = await commentsService.createComment(comment)
        this.comments.push(newComment)
      }
    },
  }
);
