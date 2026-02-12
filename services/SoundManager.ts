import { Howl } from 'howler';

class SoundManager {
    private sounds: Map<string, Howl> = new Map();
    private music: Howl | null = null;
    private enabled: boolean = false;
    private musicEnabled: boolean = false;
    private volume: number = 0.3;

    constructor() {
        // Load UI sounds
        this.loadSound('hover', '/sounds/hover.mp3', 0.2);
        this.loadSound('click', '/sounds/click.mp3', 0.3);
        this.loadSound('scroll', '/sounds/scroll.mp3', 0.1);
        this.loadSound('success', '/sounds/success.mp3', 0.4);
    }

    private loadSound(name: string, src: string, volume: number = 1.0) {
        try {
            const sound = new Howl({
                src: [src],
                volume: volume * this.volume,
                preload: true,
            });
            this.sounds.set(name, sound);
        } catch (error) {
            console.warn(`Failed to load sound: ${name}`, error);
        }
    }

    play(soundName: string) {
        if (!this.enabled) return;

        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.play();
        }
    }

    playMusic(src: string = '/sounds/ambient.mp3') {
        if (!this.musicEnabled) return;

        if (this.music) {
            this.music.stop();
        }

        try {
            this.music = new Howl({
                src: [src],
                loop: true,
                volume: 0.15 * this.volume,
                preload: true,
            });
            this.music.play();
        } catch (error) {
            console.warn('Failed to load music', error);
        }
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled.toString());
        return this.enabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        localStorage.setItem('musicEnabled', this.musicEnabled.toString());

        if (this.musicEnabled) {
            this.playMusic();
        } else {
            this.stopMusic();
        }

        return this.musicEnabled;
    }

    setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('soundVolume', this.volume.toString());

        // Update all sound volumes
        this.sounds.forEach(sound => {
            const baseVolume = sound.volume() / (this.volume || 1);
            sound.volume(baseVolume * this.volume);
        });

        if (this.music) {
            this.music.volume(0.15 * this.volume);
        }
    }

    isSoundEnabled() {
        return this.enabled;
    }

    isMusicEnabled() {
        return this.musicEnabled;
    }

    getVolume() {
        return this.volume;
    }
}

// Export singleton instance
export const soundManager = new SoundManager();
