with open("c:/gemilangkatunoutbound-main/blog.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Print lines for debugging
print("Line 814:", repr(lines[813]))
print("Line 815:", repr(lines[814]))
print("Line 1009:", repr(lines[1008]))
print("Line 1010:", repr(lines[1009]))

del lines[814:1009]

with open("c:/gemilangkatunoutbound-main/blog.html", "w", encoding="utf-8") as f:
    f.writelines(lines)
