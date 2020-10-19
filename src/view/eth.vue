<template>
  <div class="page">
    <h2>ETH DApp Demo</h2>
    <!-- 任务详情 -->
    <div class="task-detail-wrap">
      <div class="task-name">
        <div class="label">任务名称：</div>
        <div class="value">{{taskDetail.name}}</div>
      </div>
      <div class="task-status">
        <div class="label">任务状态：</div>
        <div :class="'value ' + taskDetail.status">{{taskDetail.status}}</div>
      </div>
      <div class="task-result">
        <div class="label">任务结果：</div>
        <div v-if="taskDetail.status === 'pending'">
          <div class="value">执行中……</div>
        </div>
        <div v-if="taskDetail.status === 'success'">
          <div class="value"><pre>{{taskDetail.response}}</pre></div>
        </div>
        <div v-if="taskDetail.status === 'error'">
          <div class="value">{{taskDetail.error}}</div>
        </div>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="task-wrap">
      <div class="task-tips">选择任务</div>
      <div class="task-list">
        <div v-for="(task, index) in tasks" :key="index" :class="'task-list-item ' + task.status" v-on:click="handleTask(index, task.name, task.test)">
          <div class="number">{{index + 1}}</div>
          <div>{{task.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ETHTasks from '@/utils/eth-tasks'

export default {
  name: 'ETH',
  data: () => {
    return {
      tasks: ETHTasks.getTasks(),
      taskDetail: {
        name: '请选择任务',
        status: '', // Pending | Success | Error
        response: '',
        error: '',
      },
    }
  },
  methods: {
    handleTask (taskIndex, taskName, testFunc) {
      console.log('taskName', taskName);
      this.taskDetail = {
        name: taskName,
        status: 'pending',
        response: '',
        error: '',
      };

      try {
        testFunc().then((response) => {
          this.handleSuccess(taskIndex, taskName, response);
        }).catch((e) => {
          this.handleError(taskIndex, taskName, e);
        });
      } catch(e) {
        this.handleError(taskIndex, taskName, e);
      }
    },
    handleSuccess (taskIndex, taskName, response) {
      if (this.taskDetail.name === taskName) {
        this.taskDetail = {
          name: taskName,
          status: 'success',
          response: typeof response === 'string' ? response : JSON.stringify(response),
        }
        this.tasks[taskIndex].status = 'success';
        this.tasks = [...this.tasks];
      }
    },
    handleError (taskIndex, taskName, err) {
      if (this.taskDetail.name === taskName) {
        let error;
        try {
          if (err instanceof Error) {
            error = err.toString();
          } else if (typeof err === 'string') {
            error = err;
          } else {
            error = JSON.stringify(err);
          }
        } catch(e) {
          error = e.toString();
        }
        this.taskDetail = {
          name: taskName,
          status: 'error',
          error,
        }
      }
    }
  },
}
</script>

<style>
.page {
  padding: 1px;
  height: 100%;
}

.task-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.2);
}
.task-tips {
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
}
.task-list {
  height: 160px;
  overflow: scroll;
}

.task-list-item {
  height: 48px;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2)
}
.task-list-item.success {
  color: white;
  background-color: green;
}
.task-list-item div {
  text-align: left;
}
.task-list-item .number {
  width: 40px;
}

.task-detail-wrap {
  max-height: 400px;
  overflow: auto;
}
.task-detail-wrap .label {
 text-align: left;
}
.task-detail-wrap .value {
  background-color: rgba(0, 0, 0, 0.1);
}

.task-detail-wrap .value.success {
  color: white;
  background-color: green;
}

.task-detail-wrap .value.error {
  color: white;
  background-color: red;
}
.task-result .value {
  padding: 10px;
  text-align: left;
  overflow-wrap: break-word;
}
</style>