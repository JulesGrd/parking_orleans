from apscheduler.schedulers.blocking import BlockingScheduler
import pytz

sched = BlockingScheduler()

from datetime import datetime

# set timezone
pytz.timezone('Europe/Paris')


@sched.scheduled_job('interval', minutes=10)
def timed_job():
    print('This job is run every three minutes.')


sched.start()
