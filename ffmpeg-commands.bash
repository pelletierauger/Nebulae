ffmpeg -y -f image2 -framerate 24 \
-i /Volumes/Volumina/frames/neon-summer/nebulae-01/nebulae-01-%05d.png \
-c:v libx264 -x264-params "keyint=15:no-deblock=1" -pix_fmt yuv420p \
-sws_flags spline+accurate_rnd+full_chroma_int \
-vf "colorspace=bt709:iall=bt601-6-625:fast=1" \
-color_range 1 -colorspace 1 -color_primaries 1 -color_trc 1 \
-crf 21 -preset ultrafast \
-threads 1 \
-shortest /Volumes/Volumina/video-renders/neon-summer/nebulae-01.mp4

ffmpeg -y -f image2 -framerate 24 \
-i /Volumes/Volumina/frames/neon-summer/nebulae-01/nebulae-01-%05d.png \
-c:v libx264 -x264-params "keyint=15:no-deblock=1" -pix_fmt yuv420p \
-sws_flags spline+accurate_rnd+full_chroma_int \
-vf "colorspace=bt709:iall=bt601-6-625:fast=1, hue=h=-3" \
-color_range 1 -colorspace 1 -color_primaries 1 -color_trc 1 \
-crf 21 -preset ultrafast \
-threads 1 \
-shortest /Volumes/Volumina/video-renders/neon-summer/nebulae-01-c.mp4

ffmpeg -y -f image2 -framerate 24 \
-i /Volumes/Volumina/frames/neon-summer/nebulae-01/nebulae-01-%05d.png \
-c:v libx264 -x264-params "keyint=15:no-deblock=1" -pix_fmt yuv420p \
-crf 21 -preset ultrafast \
-threads 1 \
-shortest /Volumes/Volumina/video-renders/neon-summer/nebulae-01-b.mp4

ffmpeg -y -f image2 -framerate 24 \
-i /Volumes/Volumina/frames/neon-summer/nebulae-02/nebulae-02-%05d.png \
-c:v libx264 -x264-params "keyint=15:no-deblock=1" -pix_fmt yuv420p \
-sws_flags spline+accurate_rnd+full_chroma_int \
-vf "colorspace=bt709:iall=bt601-6-625:fast=1, hue=h=-3" \
-color_range 1 -colorspace 1 -color_primaries 1 -color_trc 1 \
-crf 21 -preset ultrafast \
-threads 1 \
-shortest /Volumes/Volumina/video-renders/neon-summer/nebulae-02.mp4