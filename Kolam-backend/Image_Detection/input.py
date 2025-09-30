import cv2
import numpy as np
import json
from matplotlib import pyplot as plt

def detect_kolam_elements(image_path, dot_rmin=13, dot_rmax=20, dot_area_min=130, show_visualization=True):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Dot detection (filtered by area and radius)
    circles = cv2.HoughCircles(
        blurred,
        cv2.HOUGH_GRADIENT,
        dp=1.1,
        minDist=40,
        param1=100,
        param2=13,
        minRadius=dot_rmin,
        maxRadius=dot_rmax
    )
    dot_coords = []
    mask = np.zeros_like(gray)
    if circles is not None:
        circles = np.uint16(np.around(circles))
        for (x, y, r) in circles[0, :]:
            area = np.pi * r * r
            if dot_area_min <= area <= np.pi * dot_rmax * dot_rmax:
                dot_coords.append((int(x), int(y)))
                cv2.circle(mask, (x, y), r, 255, -1)
                if show_visualization:
                    cv2.circle(img, (x, y), r, (0, 255, 0), 2)
                    cv2.circle(img, (x, y), 2, (0, 0, 255), 3)
    
    # Line and curve detection (mask out dots before searching lines/curves)
    edges = cv2.Canny(blurred, 50, 150)
    edges = cv2.bitwise_and(edges, cv2.bitwise_not(mask))

    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=50, minLineLength=40, maxLineGap=10)
    line_segments = []
    if lines is not None:
        for l in lines:
            x1, y1, x2, y2 = l[0]
            line_segments.append([(int(x1), int(y1)), (int(x2), int(y2))])
            if show_visualization:
                cv2.line(img, (x1, y1), (x2, y2), (255, 0, 0), 2)

    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    for cnt in contours:
        if cv2.arcLength(cnt, False) > 100:
            curve = [(int(pt[0][0]), int(pt[0][1])) for pt in cnt]
            line_segments.append(curve)
            if show_visualization:
                cv2.drawContours(img, [cnt], -1, (0, 255, 255), 2)
    
    # Save detected coordinates and segments to a JSON file
    data = {
        "dots": dot_coords,
        "lines_curves": line_segments
    }
    with open("kolam_data.json", "w") as f:
        json.dump(data, f, indent=4)
    print("Kolam coordinates saved to kolam_data.json")
    
    # Optional visualization
    if show_visualization:
        plt.figure(figsize=(10,8))
        plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        plt.title('Kolam Dots (filtered) and Lines')
        plt.show()
    return data

# Usage example (replace with your image file path)
# detect_kolam_elements("even.png")
