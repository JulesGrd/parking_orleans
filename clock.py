from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

from datetime import datetime


@sched.scheduled_job('interval', minutes=0.5)
def timed_job():
    print('This job is run every three minutes.')


sched.start()
