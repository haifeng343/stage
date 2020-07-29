<template>
  <div>
    <div class="row">
      <div class="col-2">
        <button class="btn btn-secondary button" @click="sort">To original order</button>
      </div>

      <div class="col-6">
        <h3>Transition</h3>
        <draggable
          class="list-group"
          tag="ul"
          v-model="list"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <li class="list-group-item" v-for="element in list" :key="element.order">
              <i
                :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
                @click="element.fixed = !element.fixed"
                aria-hidden="true"
              ></i>
              {{ element.name }}
            </li>
          </transition-group>
        </draggable>
      </div>

      <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->
    </div>

    <div class="container">

    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
let idGlobal = 8
const message = [
  '冰箱一层',
  '冰箱二层',
  '冰箱三层',
  '冰箱四层',
  '冰箱五层',
  '冰箱六层',
  '冰箱七层',
  '冰箱八层',
  '冰箱九层',
  '冰箱十层',
  '冰箱十一层',
  '冰箱十二层',
  '冰箱十三层',
  '冰箱十四层',
  '冰箱十五层',
  '冰箱十六层',
]
export default {
  components: {
    draggable,
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 }
      }),
      drag: false,

      list1: [
        { name: 'Jesus', id: 1 },
        { name: 'Paul', id: 2 },
        { name: 'Peter', id: 3 },
      ],
      list2: [
        { name: 'Luc', id: 5 },
        { name: 'Thomas', id: 6 },
        { name: 'John', id: 7 },
      ],
      controlOnStart: true,
    }
  },
  methods: {
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order)
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
}
</script>
<style scoped>
.list-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-group span {
  /* width: 800px; */
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.list-group-item {
  width: 300px;
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.container {
  width: 1200px;
  height: auto;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
</style>