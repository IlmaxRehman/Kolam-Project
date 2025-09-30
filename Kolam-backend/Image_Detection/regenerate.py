import json
import cv2
import numpy as np
import random
import os

def regenerate_kolam(save_path="results/regenerated.png", canvas_size=800):
    """
    Regenerate a new Kolam-like pattern (not just copy of original).
    """
    with open("kolam_data.json") as f:
        data = json.load(f)

    dots = data["dots"]

    # White canvas for fresh pattern
    regenerated_img = np.ones((canvas_size, canvas_size, 3), dtype=np.uint8) * 255

    # 🎨 Colors
    dot_color = (0, 0, 255)      # Red
    line_color = (255, 0, 0)     # Blue
    curve_color = (0, 128, 0)    # Dark Green

    # 🔹 Place dots symmetrically instead of random
    spacing = canvas_size // (int(len(dots) ** 0.5) + 2)
    new_dots = []
    for i in range(int(len(dots) ** 0.5)):
        for j in range(int(len(dots) ** 0.5)):
            new_dots.append((spacing * (j+1), spacing * (i+1)))

    # Draw dots
    for (x, y) in new_dots:
        cv2.circle(regenerated_img, (x, y), 6, dot_color, -1)

    # 🔹 Connect dots with some lines
    for i in range(0, len(new_dots)-1, 2):
        cv2.line(regenerated_img, new_dots[i], new_dots[i+1], line_color, 2)

    # 🔹 Draw some curve patterns
    for i in range(0, len(new_dots)-3, 3):
        pts = np.array([new_dots[i], new_dots[i+1], new_dots[i+2]], np.int32).reshape((-1, 1, 2))
        cv2.polylines(regenerated_img, [pts], True, curve_color, 2)

    # Save
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    cv2.imwrite(save_path, regenerated_img)

    return regenerated_img
