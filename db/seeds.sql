INSERT INTO data_output (category, min, max, meditation, exercise, description)
VALUES ("normal", 0, 25, "c1Ndym-IsQg", "KVG-geWTsA4", "Your stress levels are pretty normal. Keep it up by adding an exercise or flow to your morning routine."),
("normal", 0, 25, "Jholcb8Gz0M", "d8QqXLV3tWM", "Your stress levels are pretty normal. Keep it up by adding an exercise or flow to your morning routine."),
("mild", 26, 50, "SEfs5TJZ6Nk", "5D3XjctYD9s", "A little stress is normal and healthy. You could benefit from a little meditation and adding some exercises to your routine."),
("mild", 26, 50, "8Xdwr4cRTVA", "K-PpDkbcNGo", "A little stress is normal and healthy. You could benefit from a little meditation and adding some exercises to your routine."),
("moderate", 51, 75, "3RxXiFgkxGc", "6OS-iG39mqk", "Not alarming, but moderate stress levels indicate you should be proactive about stress management. Manage your stress with some meditation if you don't already. Go the extra mile and get some exercise to be in a healthy headspace."),
("moderate", 51, 75, "7CTsdbf81W8", "QS2yDmWk0vs", "Not alarming, but moderate stress levels indicate you should be proactive about stress management. Manage your stress with some meditation if you don't already. Go the extra mile and get some exercise to be in a healthy headspace."),
("high", 76, 100, "_6_akBtKZdE", "XHvN7gOwuhM", "High stress takes time to regulate. Incorporating mindful meditation for anxiety and exercising regularly can go a long ways to get you feeling your best self."),
("high", 76, 100, "T0nuKBVQS7M", "BK90NqYx1Hg", "High stress takes time to regulate. Incorporating mindful meditation for anxiety and exercising regularly can go a long ways to get you feeling your best self."),
("severe", 0, 25, "MR57rug8NsM", "UBMk30rjy0o", "Exercise, yoga, and meditation will help your severe stress. If you can incorporate at least one of these, take a break from your thoughts, and focus on being present, you'll be in a better headspace. Hang in there!"),
("severe", 0, 25, "MCYM1VtVb3A", "Nw2oBIrQGLo", "Exercise, yoga, and meditation will help your severe stress. If you can incorporate at least one of these, take a break from your thoughts, and focus on being present, you'll be in a better headspace. Hang in there!");


INSERT INTO user_info (username, password, name, score)
VALUES ("jonathan123", "hello1", "jonathan", 50), ("luc123", "hello2", "luc", 75), ("greg123", "hello3", "greg", 25), ("lynne125", "hello4", "lynne", 15)

UPDATE user_info SET meditationvid = c1Ndym-IsQg WHERE id = 4