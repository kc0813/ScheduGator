from algorithmHelper import Section, Course, commonTimes

sec1 = Section(["M1", "T2"])
sec2 = Section(["M1", "T1"])
sec3 = Section(["M1", "T3"])

validCourse = Course("ABC1234", [sec1, sec2])
validCourse2 = Course("ABC1234l", [sec1, sec2])


# section testing
def test_commonTimes():
    assert commonTimes([sec1, sec1]) == ["M1", "T2"]
    assert commonTimes([sec1, sec2, sec3]) == ["M1"]


def test_validateCodeInvalid():
    try:
        Course("ABC1234la", [sec1, sec2])
        assert False
    except ValueError:
        assert True
    try:
        Course("ABC1234o", [sec1, sec2])
        assert False
    except ValueError:
        assert True
