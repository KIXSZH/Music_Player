new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Anirudh Ravichander",
          artist: "Kannana Kanne 🩵",
          cover: "img/1.jpg",
          source: "mp3/1.mp3",
          url: "https://open.spotify.com/track/3k2UFDQ4u7PYx7jDgCvrtr?si=dd2f5a1394a849b8",
          favorited: true
        },
        {
          name: "Pradeep Kumar",
          artist: "Aval 🤍",
          cover: " img/2.jpeg",
          source: "mp3/2.mp3",
          url: "https://open.spotify.com/track/4LK8863ScRhhT6hitFfBI5?si=35eb5904ef714e90",
          favorited: true
        },

        {
          name: "Alan Walker , Ava Max",
          artist: "Alone Pt. II 🫂",
          cover: " img/3.jpeg",
          source: " mp3/3.mp3",
          url: "https://open.spotify.com/track/0bMbDctzMmTyK2j74j3nF3?si=d5f2e8f9a0034e48",
          favorited: false
        },

        {
          name: "Fujii Kaze",
          artist: "Shinunoga E-Wa 🖤",
          cover: " img/4.jpeg",
          source: " mp3/4.mp3",
          url: "https://open.spotify.com/track/0o9zmvc5f3EFApU52PPIyW?si=7bd9095880014d4c",
          favorited: true
        },
        {
          name: " Arctic Monkeys",
          artist: "I Wanna Be Yours 🩶",
          cover: " img/5.jpeg",
          source: " mp3/5.mp3",
          url: "https://open.spotify.com/track/5XeFesFbtLpXzIVDNQP22n?si=676026c0caa045b8",
          favorited: true
        },
        {
          name: "Stephen Sanchez",
          artist: "Until I Found You 💕",
          cover: " img/6.jpeg",
          source: " mp3/6.mp3",
          url: "https://open.spotify.com/track/1Y3LN4zO1Edc2EluIoSPJN?si=09ebde66cc4a42bc",
          favorited: true
        },
        {
          name: "Ed Sheeran",
          artist: "Perfect 💘",
          cover: " img/7.jpeg",
          source: " mp3/7.mp3",
          url: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v?si=e2f61096d14d4785",
          favorited: true
        },
        
        
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
